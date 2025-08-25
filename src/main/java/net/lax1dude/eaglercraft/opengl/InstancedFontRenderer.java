package net.lax1dude.eaglercraft.opengl;

import static net.lax1dude.eaglercraft.internal.PlatformOpenGL.*;
import static net.lax1dude.eaglercraft.opengl.RealOpenGLEnums.*;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import net.lax1dude.eaglercraft.Display;
import net.lax1dude.eaglercraft.EagRuntime;
import net.lax1dude.eaglercraft.internal.IVertexArrayGL;
import net.lax1dude.eaglercraft.internal.IBufferGL;
import net.lax1dude.eaglercraft.internal.IProgramGL;
import net.lax1dude.eaglercraft.internal.IShaderGL;
import net.lax1dude.eaglercraft.internal.IUniformGL;
import net.lax1dude.eaglercraft.internal.buffer.ByteBuffer;
import net.lax1dude.eaglercraft.internal.buffer.FloatBuffer;
import net.lax1dude.eaglercraft.vector.Matrix4f;
import net.lax1dude.eaglercraft.vector.Vector4f;

/**
 * Copyright (c) 2022-2024 lax1dude. All Rights Reserved.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 * 
 */
public class InstancedFontRenderer {

	private static final Logger logger = LogManager.getLogger("InstancedFontRenderer");

	public static final String vertexShaderPath = "/assets/eagler/glsl/accel_font.vsh";
	public static final String vertexShaderPrecision = "precision lowp int;\nprecision highp float;\nprecision mediump sampler2D;\n";

	public static final String fragmentShaderPath = "/assets/eagler/glsl/accel_font.fsh";
	public static final String fragmentShaderPrecision = "precision lowp int;\nprecision highp float;\nprecision mediump sampler2D;\n";

	private static final int BYTES_PER_CHARACTER = 10;
	private static final int CHARACTER_LIMIT = 6553;

	private static IProgramGL shaderProgram = null;
	private static IUniformGL u_matrixTransform = null;
	private static FloatBuffer matrixCopyBuffer = null;
	private static IUniformGL u_charSize2f = null;
	private static IUniformGL u_charCoordSize2f = null;
	private static IUniformGL u_color4f = null;
	private static IUniformGL u_colorBias4f = null;

	private static IVertexArrayGL vertexArray = null;
	private static IBufferGL vertexBuffer = null;

	private static IBufferGL instancesBuffer = null;

	private static float stateColorR = -999.0f;
	private static float stateColorG = -999.0f;
	private static float stateColorB = -999.0f;
	private static float stateColorA = -999.0f;
	private static int stateColorSerial = -1;

	private static float stateColorBiasR = -999.0f;
	private static float stateColorBiasG = -999.0f;
	private static float stateColorBiasB = -999.0f;
	private static float stateColorBiasA = -999.0f;

	private static final Matrix4f tmpMatrix = new Matrix4f();
	private static final Vector4f tmpVector = new Vector4f();
	private static int stateModelMatrixSerial = -1;
	private static int stateProjectionMatrixSerial = -1;

	private static float charWidthValue = -1;
	private static float charHeightValue = -1;
	private static float charCoordWidthValue = -1.0f;
	private static float charCoordHeightValue = -1.0f;

	static void initialize() {
		String vertexSource = EagRuntime.getRequiredResourceString(vertexShaderPath);
		String fragmentSource = EagRuntime.getRequiredResourceString(fragmentShaderPath);

		IShaderGL vert = _wglCreateShader(GL_VERTEX_SHADER);
		IShaderGL frag = _wglCreateShader(GL_FRAGMENT_SHADER);

		_wglShaderSource(vert, GLSLHeader.getVertexHeaderCompat(vertexSource, vertexShaderPrecision));
		_wglCompileShader(vert);

		if (_wglGetShaderi(vert, GL_COMPILE_STATUS) != GL_TRUE) {
			Display.checkContextLost();
			logger.error("Failed to compile GL_VERTEX_SHADER \"" + vertexShaderPath + "\" for InstancedFontRenderer!");
			String log = _wglGetShaderInfoLog(vert);
			if (log != null) {
				String[] lines = log.split("(\\r\\n|\\r|\\n)");
				for (int i = 0; i < lines.length; ++i) {
					logger.error("[VERT] {}", lines[i]);
				}
			}
			throw new IllegalStateException("Vertex shader \"" + vertexShaderPath + "\" could not be compiled!");
		}

		_wglShaderSource(frag, GLSLHeader.getFragmentHeaderCompat(fragmentSource, fragmentShaderPrecision));
		_wglCompileShader(frag);

		if (_wglGetShaderi(frag, GL_COMPILE_STATUS) != GL_TRUE) {
			Display.checkContextLost();
			logger.error(
					"Failed to compile GL_FRAGMENT_SHADER \"" + fragmentShaderPath + "\" for InstancedFontRenderer!");
			String log = _wglGetShaderInfoLog(frag);
			if (log != null) {
				String[] lines = log.split("(\\r\\n|\\r|\\n)");
				for (int i = 0; i < lines.length; ++i) {
					logger.error("[FRAG] {}", lines[i]);
				}
			}
			throw new IllegalStateException("Fragment shader \"" + fragmentShaderPath + "\" could not be compiled!");
		}

		shaderProgram = _wglCreateProgram();

		_wglAttachShader(shaderProgram, vert);
		_wglAttachShader(shaderProgram, frag);

		if (EaglercraftGPU.checkOpenGLESVersion() == 200) {
			VSHInputLayoutParser.applyLayout(shaderProgram, VSHInputLayoutParser.getShaderInputs(vertexSource));
		}

		_wglLinkProgram(shaderProgram);

		_wglDetachShader(shaderProgram, vert);
		_wglDetachShader(shaderProgram, frag);

		_wglDeleteShader(vert);
		_wglDeleteShader(frag);

		if (_wglGetProgrami(shaderProgram, GL_LINK_STATUS) != GL_TRUE) {
			Display.checkContextLost();
			logger.error("Failed to link shader program for InstancedFontRenderer!");
			String log = _wglGetProgramInfoLog(shaderProgram);
			if (log != null) {
				String[] lines = log.split("(\\r\\n|\\r|\\n)");
				for (int i = 0; i < lines.length; ++i) {
					logger.error("[LINK] {}", lines[i]);
				}
			}
			throw new IllegalStateException("Shader program for InstancedFontRenderer could not be linked!");
		}

		matrixCopyBuffer = EagRuntime.allocateFloatBuffer(16);
		fontDataBuffer = EagRuntime.allocateByteBuffer(CHARACTER_LIMIT * BYTES_PER_CHARACTER);
		fontBoldDataBuffer = EagRuntime.allocateByteBuffer(CHARACTER_LIMIT * BYTES_PER_CHARACTER);

		EaglercraftGPU.bindGLShaderProgram(shaderProgram);

		u_matrixTransform = _wglGetUniformLocation(shaderProgram, "u_matrixTransform");
		u_charSize2f = _wglGetUniformLocation(shaderProgram, "u_charSize2f");
		u_charCoordSize2f = _wglGetUniformLocation(shaderProgram, "u_charCoordSize2f");
		u_color4f = _wglGetUniformLocation(shaderProgram, "u_color4f");
		u_colorBias4f = _wglGetUniformLocation(shaderProgram, "u_colorBias4f");

		_wglUniform1i(_wglGetUniformLocation(shaderProgram, "u_inputTexture"), 0);

		vertexArray = EaglercraftGPU.createGLVertexArray();
		vertexBuffer = _wglGenBuffers();
		instancesBuffer = _wglGenBuffers();

		FloatBuffer verts = EagRuntime.allocateFloatBuffer(108);
		float paddingA = 0.005f;
		float paddingB = 1.0f - paddingA;
		verts.put(new float[] {

				// (0 - 6 - 12) regular:

				paddingA, paddingA, 0.25f, paddingA, paddingB, 0.25f, paddingB, paddingA, 0.25f, paddingB, paddingA,
				0.25f, paddingA, paddingB, 0.25f, paddingB, paddingB, 0.25f, paddingA, paddingA, 0.0f, paddingA,
				paddingB, 0.0f, paddingB, paddingA, 0.0f, paddingB, paddingA, 0.0f, paddingA, paddingB, 0.0f, paddingB,
				paddingB, 0.0f,

				// (12 - 24 - 36) bold shadow:

				paddingA, paddingA, 0.25f, paddingA, paddingB, 0.25f, paddingB, paddingA, 0.25f, paddingB, paddingA,
				0.25f, paddingA, paddingB, 0.25f, paddingB, paddingB, 0.25f, paddingA, paddingA, 0.75f, paddingA,
				paddingB, 0.75f, paddingB, paddingA, 0.75f, paddingB, paddingA, 0.75f, paddingA, paddingB, 0.75f,
				paddingB, paddingB, 0.75f,

				paddingA, paddingA, 0.0f, paddingA, paddingB, 0.0f, paddingB, paddingA, 0.0f, paddingB, paddingA, 0.0f,
				paddingA, paddingB, 0.0f, paddingB, paddingB, 0.0f, paddingA, paddingA, 0.5f, paddingA, paddingB, 0.5f,
				paddingB, paddingA, 0.5f, paddingB, paddingA, 0.5f, paddingA, paddingB, 0.5f, paddingB, paddingB, 0.5f

		});
		verts.flip();

		EaglercraftGPU.bindGLVertexArray(vertexArray);

		EaglercraftGPU.bindVAOGLArrayBufferNow(vertexBuffer);
		_wglBufferData(GL_ARRAY_BUFFER, verts, GL_STATIC_DRAW);

		EagRuntime.freeFloatBuffer(verts);

		EaglercraftGPU.enableVertexAttribArray(0);
		EaglercraftGPU.vertexAttribPointer(0, 3, GL_FLOAT, false, 12, 0);
		EaglercraftGPU.vertexAttribDivisor(0, 0);

		EaglercraftGPU.bindVAOGLArrayBuffer(instancesBuffer);

		EaglercraftGPU.enableVertexAttribArray(1);
		EaglercraftGPU.vertexAttribPointer(1, 2, GL_SHORT, false, 10, 0);
		EaglercraftGPU.vertexAttribDivisor(1, 1);

		EaglercraftGPU.enableVertexAttribArray(2);
		EaglercraftGPU.vertexAttribPointer(2, 2, GL_UNSIGNED_BYTE, false, 10, 4);
		EaglercraftGPU.vertexAttribDivisor(2, 1);

		EaglercraftGPU.enableVertexAttribArray(3);
		EaglercraftGPU.vertexAttribPointer(3, 4, GL_UNSIGNED_BYTE, true, 10, 6);
		EaglercraftGPU.vertexAttribDivisor(3, 1);

	}

	private static ByteBuffer fontDataBuffer = null;
	private static int charactersDrawn = 0;
	private static ByteBuffer fontBoldDataBuffer = null;
	private static int boldCharactersDrawn = 0;
	private static boolean hasOverflowed = false;
	private static boolean hasBoldOverflowed = false;

	private static boolean fogEnabled = false;
	private static int widthCalcLeast = Integer.MAX_VALUE;
	private static int heightCalcLeast = Integer.MAX_VALUE;
	private static int widthCalcMost = Integer.MAX_VALUE;
	private static int heightCalcMost = Integer.MAX_VALUE;

	public static void begin() {
		fontDataBuffer.clear();
		charactersDrawn = 0;
		fontBoldDataBuffer.clear();
		boldCharactersDrawn = 0;
		hasOverflowed = false;
		hasBoldOverflowed = false;
		fogEnabled = GlStateManager.stateFog && GlStateManager.stateFogDensity > 0.0f;
		if (fogEnabled) {
			widthCalcLeast = Integer.MAX_VALUE;
			heightCalcLeast = Integer.MAX_VALUE;
			widthCalcMost = Integer.MAX_VALUE;
			heightCalcMost = Integer.MAX_VALUE;
		}
	}

	public static void render(float charWidth, float charHeight, float charCoordWidth, float charCoordHeight,
			boolean shadow) {
		if (charactersDrawn == 0 && boldCharactersDrawn == 0) {
			return;
		}
		EaglercraftGPU.bindGLShaderProgram(shaderProgram);

		if (charWidth != charWidthValue || charHeight != charHeightValue) {
			charWidthValue = charWidth;
			charHeightValue = charHeight;
			_wglUniform2f(u_charSize2f, (float) charWidth, (float) charHeight);
		}

		if (charCoordWidth != charCoordWidthValue || charCoordHeight != charCoordHeightValue) {
			charCoordWidthValue = charCoordWidth;
			charCoordHeightValue = charCoordHeight;
			_wglUniform2f(u_charCoordSize2f, charCoordWidth, charCoordHeight);
		}

		int ptr1 = GlStateManager.modelMatrixStackPointer;
		int serial1 = GlStateManager.modelMatrixStackAccessSerial[ptr1];
		int ptr2 = GlStateManager.projectionMatrixStackPointer;
		int serial2 = GlStateManager.projectionMatrixStackAccessSerial[ptr2];
		if (stateModelMatrixSerial != serial1 || stateProjectionMatrixSerial != serial2) {
			stateModelMatrixSerial = serial1;
			stateProjectionMatrixSerial = serial2;
			Matrix4f.mul(GlStateManager.projectionMatrixStack[ptr2], GlStateManager.modelMatrixStack[ptr1], tmpMatrix);
			matrixCopyBuffer.clear();
			tmpMatrix.store(matrixCopyBuffer);
			matrixCopyBuffer.flip();
			_wglUniformMatrix4fv(u_matrixTransform, false, matrixCopyBuffer);
		}

		if (!fogEnabled) {
			int serial = GlStateManager.stateColorSerial;
			if (stateColorSerial != serial) {
				stateColorSerial = serial;
				float r = GlStateManager.stateColorR;
				float g = GlStateManager.stateColorG;
				float b = GlStateManager.stateColorB;
				float a = GlStateManager.stateColorA;
				if (stateColorR != r || stateColorG != g || stateColorB != b || stateColorA != a) {
					_wglUniform4f(u_color4f, r, g, b, a);
					stateColorR = r;
					stateColorG = g;
					stateColorB = b;
					stateColorA = a;
				}
			}
			if (stateColorBiasR != 0.0f || stateColorBiasG != 0.0f || stateColorBiasB != 0.0f
					|| stateColorBiasA != 0.0f) {
				_wglUniform4f(u_colorBias4f, 0.0f, 0.0f, 0.0f, 0.0f);
				stateColorBiasR = 0.0f;
				stateColorBiasG = 0.0f;
				stateColorBiasB = 0.0f;
				stateColorBiasA = 0.0f;
			}
		} else {
			stateColorSerial = -1;
			Vector4f vec4 = tmpVector;
			vec4.x = (float) (widthCalcLeast + (widthCalcMost - widthCalcLeast + 1.0f) * 0.5f) * charWidth;
			vec4.y = (float) (heightCalcLeast + (heightCalcMost - heightCalcLeast + 1.0f) * 0.5f) * charHeight;
			vec4.z = 0.0f;
			vec4.w = 1.0f;

			Matrix4f.transform(GlStateManager.modelMatrixStack[ptr1], vec4, vec4);

			vec4.x /= vec4.w;
			vec4.y /= vec4.w;
			vec4.z /= vec4.w;
			vec4.w = 1.0f;

			vec4.x *= vec4.x;
			vec4.y *= vec4.y;
			vec4.z *= vec4.z;

			float fogFactor = (float) Math.sqrt(vec4.x + vec4.y + vec4.z);
			if (GlStateManager.stateFogEXP) {
				fogFactor = 1.0f - (float) Math.pow(2.718, -(GlStateManager.stateFogDensity * fogFactor));
			} else {
				fogFactor = (fogFactor - GlStateManager.stateFogStart)
						/ (GlStateManager.stateFogEnd - GlStateManager.stateFogStart);
			}

			if (fogFactor > 1.0f)
				fogFactor = 1.0f;
			if (fogFactor < 0.0f)
				fogFactor = 0.0f;

			float r = GlStateManager.stateColorR;
			float g = GlStateManager.stateColorG;
			float b = GlStateManager.stateColorB;
			float a = GlStateManager.stateColorA;

			float fogFactor2 = (1.0f - fogFactor) * GlStateManager.stateFogColorA;
			r *= fogFactor2;
			g *= fogFactor2;
			b *= fogFactor2;

			if (stateColorR != r || stateColorG != g || stateColorB != b || stateColorA != a) {
				_wglUniform4f(u_color4f, r, g, b, a);
				stateColorR = r;
				stateColorG = g;
				stateColorB = b;
				stateColorA = a;
			}

			fogFactor *= GlStateManager.stateFogColorA;
			float biasR = GlStateManager.stateFogColorR * fogFactor;
			float biasG = GlStateManager.stateFogColorG * fogFactor;
			float biasB = GlStateManager.stateFogColorB * fogFactor;
			float biasA = 0.0f;

			if (stateColorBiasR != biasR || stateColorBiasG != biasG || stateColorBiasB != biasB
					|| stateColorBiasA != biasA) {
				_wglUniform4f(u_colorBias4f, biasR, biasG, biasB, biasA);
				stateColorBiasR = biasR;
				stateColorBiasG = biasG;
				stateColorBiasB = biasB;
				stateColorBiasA = biasA;
			}
		}

		EaglercraftGPU.bindGLArrayBuffer(instancesBuffer);
		EaglercraftGPU.bindGLVertexArray(vertexArray);

		if (charactersDrawn > 0) {
			int p = fontDataBuffer.position();
			int l = fontDataBuffer.limit();

			fontDataBuffer.flip();
			_wglBufferData(GL_ARRAY_BUFFER, (fontDataBuffer.remaining() + 0x3FF) & 0xFFFFFC00, GL_STREAM_DRAW);
			_wglBufferSubData(GL_ARRAY_BUFFER, 0, fontDataBuffer);

			fontDataBuffer.position(p);
			fontDataBuffer.limit(l);

			EaglercraftGPU.drawArraysInstanced(GL_TRIANGLES, shadow ? 0 : 6, shadow ? 12 : 6, charactersDrawn);
		}

		if (boldCharactersDrawn > 0) {
			int p = fontBoldDataBuffer.position();
			int l = fontBoldDataBuffer.limit();

			fontBoldDataBuffer.flip();
			_wglBufferData(GL_ARRAY_BUFFER, (fontBoldDataBuffer.remaining() + 0x3FF) & 0xFFFFFC00, GL_STREAM_DRAW);
			_wglBufferSubData(GL_ARRAY_BUFFER, 0, fontBoldDataBuffer);

			fontBoldDataBuffer.position(p);
			fontBoldDataBuffer.limit(l);

			EaglercraftGPU.drawArraysInstanced(GL_TRIANGLES, shadow ? 12 : 24, shadow ? 24 : 12, boldCharactersDrawn);
		}
	}

	public static void appendQuad(int x, int y, int cx, int cy, int color, boolean italic) {
		if (hasOverflowed) {
			return;
		}
		if (charactersDrawn >= CHARACTER_LIMIT) {
			hasOverflowed = true;
			logger.error(
					"Font renderer buffer has overflowed! Exceeded {} regular characters, no more regular characters will be rendered.",
					CHARACTER_LIMIT);
			return;
		}
		++charactersDrawn;
		ByteBuffer buf = fontDataBuffer;
		buf.putShort((short) x);
		buf.putShort((short) y);
		buf.put((byte) cx);
		buf.put((byte) cy);
		color = ((color >>> 1) & 0x7F000000) | (color & 0xFFFFFF);
		if (italic) {
			color |= 0x80000000;
		}
		buf.putInt(color);
		if (fogEnabled) {
			updateBounds(x, y);
		}
	}

	public static void appendBoldQuad(int x, int y, int cx, int cy, int color, boolean italic) {
		if (hasBoldOverflowed) {
			return;
		}
		if (boldCharactersDrawn >= CHARACTER_LIMIT) {
			hasBoldOverflowed = true;
			logger.error(
					"Font renderer buffer has overflowed! Exceeded {} bold characters, no more bold characters will be rendered.",
					CHARACTER_LIMIT);
			return;
		}
		++boldCharactersDrawn;
		ByteBuffer buf = fontBoldDataBuffer;
		buf.putShort((short) x);
		buf.putShort((short) y);
		buf.put((byte) cx);
		buf.put((byte) cy);
		color = ((color >>> 1) & 0x7F000000) | (color & 0xFFFFFF);
		if (italic) {
			color |= 0x80000000;
		}
		buf.putInt(color);
		if (fogEnabled) {
			updateBounds(x, y);
		}
	}

	private static final void updateBounds(int x, int y) {
		if (x < widthCalcLeast || widthCalcLeast == Integer.MAX_VALUE)
			widthCalcLeast = x;
		if (x > widthCalcMost || widthCalcMost == Integer.MAX_VALUE)
			widthCalcMost = x;
		if (y < heightCalcLeast || heightCalcLeast == Integer.MAX_VALUE)
			heightCalcLeast = y;
		if (y > heightCalcMost || heightCalcMost == Integer.MAX_VALUE)
			heightCalcMost = y;
	}

	public static void destroy() {
		if (fontDataBuffer != null) {
			EagRuntime.freeByteBuffer(fontDataBuffer);
			fontDataBuffer = null;
		}
		if (fontBoldDataBuffer != null) {
			EagRuntime.freeByteBuffer(fontBoldDataBuffer);
			fontBoldDataBuffer = null;
		}
		if (shaderProgram != null) {
			_wglDeleteProgram(shaderProgram);
			shaderProgram = null;
		}
		if (matrixCopyBuffer != null) {
			EagRuntime.freeFloatBuffer(matrixCopyBuffer);
			matrixCopyBuffer = null;
		}
		u_matrixTransform = null;
		u_charSize2f = null;
		u_charCoordSize2f = null;
		u_color4f = null;
		u_colorBias4f = null;
		if (vertexArray != null) {
			EaglercraftGPU.destroyGLVertexArray(vertexArray);
			vertexArray = null;
		}
		if (vertexBuffer != null) {
			_wglDeleteBuffers(vertexBuffer);
			vertexBuffer = null;
		}
		if (instancesBuffer != null) {
			_wglDeleteBuffers(instancesBuffer);
			instancesBuffer = null;
		}
	}

}
