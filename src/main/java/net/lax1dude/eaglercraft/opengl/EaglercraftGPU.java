/*
 * Copyright (c) 2022-2025 lax1dude. All Rights Reserved.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 * 
 */

package net.lax1dude.eaglercraft.opengl;

import net.lax1dude.eaglercraft.internal.buffer.ByteBuffer;
import net.lax1dude.eaglercraft.internal.buffer.FloatBuffer;
import net.lax1dude.eaglercraft.internal.buffer.IntBuffer;

import com.carrotsearch.hppc.IntObjectHashMap;
import com.carrotsearch.hppc.IntObjectMap;
import com.mojang.util.MathHelper;

import net.lax1dude.eaglercraft.EagRuntime;
import net.lax1dude.eaglercraft.internal.GLObjectMap;
import net.lax1dude.eaglercraft.internal.IVertexArrayGL;
import net.lax1dude.eaglercraft.internal.IBufferGL;
import net.lax1dude.eaglercraft.internal.IProgramGL;
import net.lax1dude.eaglercraft.internal.IQueryGL;
import net.lax1dude.eaglercraft.internal.ITextureGL;
import net.lax1dude.eaglercraft.internal.PlatformOpenGL;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import static net.lax1dude.eaglercraft.internal.PlatformOpenGL.*;

public class EaglercraftGPU extends GlStateManager {

	static final GLObjectRecycler<IBufferGL> arrayBufferRecycler = new GLObjectRecycler<IBufferGL>(256) {

		@Override
		protected IBufferGL create() {
			return _wglGenBuffers();
		}
		
		@Override
		protected void invalidate(IBufferGL object) {
			IBufferGL old = currentArrayBuffer;
			if (old != object) {
				_wglBindBuffer(GL_ARRAY_BUFFER, object);
			}
			_wglBufferData(GL_ARRAY_BUFFER, 0, GL_STATIC_DRAW);
			if (old != object) {
				_wglBindBuffer(GL_ARRAY_BUFFER, old);
			}
		}

		@Override
		protected void destroy(IBufferGL object) {
			_wglDeleteBuffers(object);
		}

	};

	static final GLObjectRecycler<IBufferGL> elementArrayBufferRecycler = new GLObjectRecycler<IBufferGL>(256) {

		@Override
		protected IBufferGL create() {
			return _wglGenBuffers();
		}
		
		@Override
		protected void invalidate(IBufferGL object) {
			IVertexArrayGL oldArray = currentVertexArray;
			boolean vao = !emulatedVAOs;
			if (vao && vertexArrayCapable && oldArray != null) {
				_wglBindVertexArray(null);
			}
			IBufferGL old = currentEmulatedVAOIndexBuffer;
			if (vao || old != object) {
				_wglBindBuffer(GL_ELEMENT_ARRAY_BUFFER, object);
			}
			_wglBufferData(GL_ELEMENT_ARRAY_BUFFER, 0, GL_STATIC_DRAW);
			if (!vao && old != object) {
				_wglBindBuffer(GL_ELEMENT_ARRAY_BUFFER, old);
			}
			if (vao && vertexArrayCapable && oldArray != null) {
				_wglBindVertexArray(oldArray);
			}
		}

		@Override
		protected void destroy(IBufferGL object) {
			_wglDeleteBuffers(object);
		}

	};

	static final GLObjectRecycler<IVertexArrayGL> VAORecycler = new GLObjectRecycler<IVertexArrayGL>(256) {

		@Override
		protected IVertexArrayGL create() {
			return _wglGenVertexArrays();
		}
		
		@Override
		protected void invalidate(IVertexArrayGL object) {
			int i;
			int bits = object.getBits();
			if(bits != 0) {
				IVertexArrayGL old = currentVertexArray;
				if (old != object) {
					_wglBindVertexArray(object);
				}
				do {
					i = Integer.numberOfTrailingZeros(bits);
					_wglDisableVertexAttribArray(i);
				} while((bits &= ~((i << 1) - 1)) != 0);
				if (old != object) {
					_wglBindVertexArray(old);
				}
			}
		}

		@Override
		protected void destroy(IVertexArrayGL object) {
			_wglDeleteVertexArrays(object);
		}

	};

	static final GLObjectMap<ITextureGL> mapTexturesGL = new GLObjectMap<>(8192);
	static final GLObjectMap<IQueryGL> mapQueriesGL = new GLObjectMap<>(8192);
	static final IntObjectHashMap<DisplayList> mapDisplayListsGL = new IntObjectHashMap<>();

	static final Logger logger = LogManager.getLogger("EaglercraftGPU");

	static boolean emulatedVAOs = false;
	static SoftGLVertexState emulatedVAOState = new SoftGLVertexState();

	public static String gluErrorString(int i) {
		switch (i) {
		case GL_INVALID_ENUM:
			return "GL_INVALID_ENUM";
		case GL_INVALID_VALUE:
			return "GL_INVALID_VALUE";
		case 1286:
			return "GL_INVALID_FRAMEBUFFER_OPERATION";
		case GL_INVALID_OPERATION:
			return "GL_INVALID_OPERATION";
		case GL_OUT_OF_MEMORY:
			return "GL_OUT_OF_MEMORY";
		case GL_CONTEXT_LOST_WEBGL:
			return "CONTEXT_LOST_WEBGL";
		default:
			return "Unknown Error";
		}
	}

	public static void glTexParameteri(int target, int param, int value) {
		if(value == GL_CLAMP) value = GL_CLAMP_TO_EDGE;
		
		ITextureGL boundTex = GlStateManager.getCurrentBoundTexture();
		if(/*GlStateManager.activeTexture == GL_TEXTURE0 &&*/ boundTex != null && param == GL_TEXTURE_MAG_FILTER) {
			boundTex.setNearest(value == GL_NEAREST);
		}
		_wglTexParameteri(target, param, value);
		GlStateManager.updateAnisotropicPatch();
	}

	public static void glTexParameterf(int target, int param, float value) {
		ITextureGL boundTex = GlStateManager.getCurrentBoundTexture();
		if(/*GlStateManager.activeTexture == GL_TEXTURE0 &&*/ boundTex != null && param == GL_TEXTURE_MAX_ANISOTROPY) {
			boundTex.setAnisotropic(value > 1.0f);
		}
		_wglTexParameterf(target, param, value);
		GlStateManager.updateAnisotropicPatch();
	}

	public static void glCopyTexSubImage2D(int target, int level, int sx, int sy, int dx, int dy, int w, int h) {
		_wglCopyTexSubImage2D(target, level, sx, sy, dx, dy, w, h);
	}

	private static DisplayList currentList = null;
	private static ByteBuffer displayListBuffer = EagRuntime.allocateByteBuffer(0x100000);

	public static void glNewList(int target, int op) {
		if (currentList != null) {
			throw new IllegalStateException("A display list is already being compiled you eagler!");
		}
		if (op != GL_COMPILE) {
			throw new UnsupportedOperationException("Only GL_COMPILE is supported by glNewList");
		}
		DisplayList dp = currentList = mapDisplayListsGL.get(target);
		if (dp == null) {
			throw new IllegalArgumentException("Unknown display list: " + target);
		}
		if (dp.vertexArray != null && dp.attribs > 0) {
			EaglercraftGPU.bindGLVertexArray(dp.vertexArray);
			int c = 0;
			if ((dp.attribs & ATTRIB_TEXTURE) != 0) {
				EaglercraftGPU.disableVertexAttribArray(++c);
			}
			if ((dp.attribs & ATTRIB_COLOR) != 0) {
				EaglercraftGPU.disableVertexAttribArray(++c);
			}
			if ((dp.attribs & ATTRIB_NORMAL) != 0) {
				EaglercraftGPU.disableVertexAttribArray(++c);
			}
			if ((dp.attribs & ATTRIB_LIGHTMAP) != 0) {
				EaglercraftGPU.disableVertexAttribArray(++c);
			}
		}
		dp.attribs = -1;
		dp.mode = -1;
		dp.count = 0;
	}

	private static void growDisplayListBuffer(int len) {
		int wantSize = displayListBuffer.position() + len;
		if (displayListBuffer.capacity() < wantSize) {
			int newSize = (wantSize & 0xFFFE0000) + 0x40000;
			ByteBuffer newBuffer = EagRuntime.allocateByteBuffer(newSize);
			newBuffer.put((ByteBuffer) displayListBuffer.flip());
			EagRuntime.freeByteBuffer(displayListBuffer);
			displayListBuffer = newBuffer;
		}
	}

	public static void glEndList() {
		DisplayList dp = currentList;
		if(dp == null) {
			throw new IllegalStateException("No list is currently being compiled!");
		}
		
		if(dp.attribs == -1) {
			if(dp.vertexArray != null) {
				destroyGLVertexArray(dp.vertexArray);
				dp.vertexArray = null;
			}
			if(dp.vertexBuffer != null) {
				destroyGLArrayBuffer(dp.vertexBuffer);
				dp.vertexBuffer = null;
			}
			currentList = null;
			return;
		}
		
		if(dp.vertexArray == null) {
			dp.vertexArray = createGLVertexArray();
			dp.bindQuad = 0;
		}
		if(dp.vertexBuffer == null) {
			dp.vertexBuffer = createGLArrayBuffer();
		}
		
		bindVAOGLArrayBufferNow(dp.vertexBuffer);
		displayListBuffer.flip();
		_wglBufferData(GL_ARRAY_BUFFER, displayListBuffer, GL_STATIC_DRAW);
		displayListBuffer.clear();
		
		FixedFunctionPipeline.setupDisplayList(dp);
		currentList = null;
	}

	public static void uploadListDirect(int target, ByteBuffer buffer, int attrib, int mode, int count) {
		DisplayList dp = mapDisplayListsGL.get(target);
		if (dp == null) {
			throw new IllegalArgumentException("Unknown display list: " + target);
		}

		if (dp.vertexArray != null && dp.attribs > 0) {
			EaglercraftGPU.bindGLVertexArray(dp.vertexArray);
			int c = 0;
			if ((dp.attribs & ATTRIB_TEXTURE) != 0) {
				EaglercraftGPU.disableVertexAttribArray(++c);
			}
			if ((dp.attribs & ATTRIB_COLOR) != 0) {
				EaglercraftGPU.disableVertexAttribArray(++c);
			}
			if ((dp.attribs & ATTRIB_NORMAL) != 0) {
				EaglercraftGPU.disableVertexAttribArray(++c);
			}
			if ((dp.attribs & ATTRIB_LIGHTMAP) != 0) {
				EaglercraftGPU.disableVertexAttribArray(++c);
			}
		}

		if (dp.vertexArray == null) {
			dp.vertexArray = createGLVertexArray();
			dp.bindQuad = 0;
		}
		if (dp.vertexBuffer == null) {
			dp.vertexBuffer = createGLArrayBuffer();
		}

		bindVAOGLArrayBufferNow(dp.vertexBuffer);
		_wglBufferData(GL_ARRAY_BUFFER, buffer, GL_STATIC_DRAW);

		dp.attribs = attrib;
		FixedFunctionPipeline.setupDisplayList(dp);

		dp.mode = mode;
		dp.count = count;
	}

	public static void glCallList(int displayList) {
		DisplayList dp = mapDisplayListsGL.get(displayList);
		if (dp == null) {
			throw new NullPointerException("Tried to call a display list that does not exist: " + displayList);
		}
		if (dp.attribs != -1) {
			FixedFunctionPipeline p = FixedFunctionPipeline.setupRenderDisplayList(dp.attribs).update();
			bindGLVertexArray(dp.vertexArray);
			if (dp.mode == GL_QUADS) {
				int cnt = dp.count;
				if (cnt > quad16MaxVertices) {
					if(dp.bindQuad != 32) {
						dp.bindQuad = 32;
						attachQuad32EmulationBuffer(cnt, true);
					} else {
						attachQuad32EmulationBuffer(cnt, false);
					}
					p.drawRangeElements(GL_TRIANGLES, 0, cnt - 1, (cnt >> 2) * 6, GL_UNSIGNED_INT, 0);
				} else {
					if(dp.bindQuad != 16) {
						dp.bindQuad = 16;
						attachQuad16EmulationBuffer(true);
					}
					p.drawRangeElements(GL_TRIANGLES, 0, cnt - 1, (cnt >> 2) * 6, GL_UNSIGNED_SHORT, 0);
				}
			} else {
				p.drawArrays(dp.mode, 0, dp.count);
			}
		}
	}

	public static void flushDisplayList(int displayList, boolean ignore) {
		DisplayList dp = mapDisplayListsGL.get(displayList);
		if (dp == null) {
			if(ignore) {
				return;
			}
			throw new NullPointerException("Tried to flush a display list that does not exist: " + displayList);
		}
		dp.attribs = -1;
		if (dp.vertexArray != null) {
			EaglercraftGPU.destroyGLVertexArray(dp.vertexArray);
			dp.vertexArray = null;
		}
		if (dp.vertexBuffer != null) {
			EaglercraftGPU.destroyGLArrayBuffer(dp.vertexBuffer);
			dp.vertexBuffer = null;
		}
	}

	public static void glNormal3f(float x, float y, float z) {
		GlStateManager.stateNormalX = x;
		GlStateManager.stateNormalY = y;
		GlStateManager.stateNormalZ = z;
		++GlStateManager.stateNormalSerial;
	}

	private static final IntObjectMap<String> stringCache = new IntObjectHashMap<>();

	public static String glGetString(int param) {
		String str = stringCache.get(param);
		if (str == null) {
			str = _wglGetString(param);
			if (str == null) {
				str = "";
			}
			stringCache.put(param, str);
		}
		return str.length() == 0 ? null : str;
	}

	public static void glGetInteger(int param, int[] values) {
		switch (param) {
		case GL_VIEWPORT:
			values[0] = GlStateManager.viewportX;
			values[1] = GlStateManager.viewportY;
			values[2] = GlStateManager.viewportW;
			values[3] = GlStateManager.viewportH;
			break;
		default:
			throw new UnsupportedOperationException("glGetInteger only accepts GL_VIEWPORT as a parameter");
		}
	}

	public static int glGetInteger(int param) {
		return _wglGetInteger(param);
	}

	public static void glTexImage2D(int target, int level, int internalFormat, int w, int h, int unused, int format,
			int type, ByteBuffer pixels) {
		GlStateManager.setTextureCachedSize(target, w, h);
		if (glesVers >= 300) {
			switch(internalFormat) {
			case GL_LUMINANCE:
				internalFormat = ExtGLEnums._GL_R8;
				break;
			case GL_RGB:
				internalFormat = GL_RGB8;
				break;
			case GL_RGBA:
				internalFormat = GL_RGBA8;
				break;
			default:
				break;
			}
			_wglTexImage2D(target, level, internalFormat, w, h, unused, format, type, pixels);
		} else {
			int tv = TextureFormatHelper.trivializeInternalFormatToGLES20(internalFormat);
			_wglTexImage2D(target, level, tv, w, h, unused, tv, type, pixels);
		}
		GlStateManager.updateAnisotropicPatch();
	}

	public static void glTexImage2D(int target, int level, int internalFormat, int w, int h, int unused, int format,
			int type, IntBuffer pixels) {
		GlStateManager.setTextureCachedSize(target, w, h);
		if (glesVers >= 300) {
			_wglTexImage2D(target, level, internalFormat, w, h, unused, format, type, pixels);
		} else {
			int tv = TextureFormatHelper.trivializeInternalFormatToGLES20(internalFormat);
			_wglTexImage2D(target, level, tv, w, h, unused, tv, type, pixels);
		}
		GlStateManager.updateAnisotropicPatch();
	}

	public static void glTexSubImage2D(int target, int level, int x, int y, int w, int h, int format, int type,
			IntBuffer pixels) {
		_wglTexSubImage2D(target, level, x, y, w, h, format, type, pixels);
	}

	public static void glTexSubImage2D(int target, int level, int x, int y, int w, int h, int format, int type,
			ByteBuffer pixels) {
		_wglTexSubImage2D(target, level, x, y, w, h, format, type, pixels);
	}

	public static void glTexStorage2D(int target, int levels, int internalFormat, int w, int h) {
		GlStateManager.setTextureCachedSize(target, w, h);
		if (texStorageCapable
				&& (glesVers >= 300 || levels == 1 || (MathHelper.log2DeBruijn(Math.max(w, h)) + 1) == levels)) {
			_wglTexStorage2D(target, levels, internalFormat, w, h);
		} else {
			int tv = TextureFormatHelper.trivializeInternalFormatToGLES20(internalFormat);
			int type = TextureFormatHelper.getTypeFromInternal(internalFormat);
			for (int i = 0; i < levels; ++i) {
				_wglTexImage2D(target, i, tv, Math.max(w >> i, 1), Math.max(h >> i, 1), 0, tv, type, (ByteBuffer) null);
			}
		}
	}

	public static void glReadPixels(int x, int y, int width, int height, int format, int type, ByteBuffer buffer) {
		switch (type) {
		case GL_FLOAT:
			_wglReadPixels(x, y, width, height, format, GL_FLOAT, buffer.asFloatBuffer());
			break;
		case 0x140B: // GL_HALF_FLOAT
			_wglReadPixels_u16(x, y, width, height, format, glesVers == 200 ? 0x8D61 : 0x140B, buffer);
			break;
		case GL_UNSIGNED_BYTE:
		default:
			_wglReadPixels(x, y, width, height, format, type, buffer);
			break;
		}
	}

	public static void glLineWidth(float f) {
		_wglLineWidth(f);
	}

	public static void glFog(int param, FloatBuffer valueBuffer) {
		int pos = valueBuffer.position();
		switch (param) {
		case GL_FOG_COLOR:
			GlStateManager.stateFogColorR = valueBuffer.get();
			GlStateManager.stateFogColorG = valueBuffer.get();
			GlStateManager.stateFogColorB = valueBuffer.get();
			GlStateManager.stateFogColorA = valueBuffer.get();
			++GlStateManager.stateFogSerial;
			break;
		default:
			throw new UnsupportedOperationException("Only GL_FOG_COLOR is configurable!");
		}
		valueBuffer.position(pos);
	}
	
	private static int displayListId = 1;
	public static int glGenLists(int count) {
		int glBaseList = displayListId;
		for (int i = 0; i < count; i++) {
			mapDisplayListsGL.put(displayListId, new DisplayList());
			++displayListId;
		}
		return glBaseList;
	}
	
	public static int glGenLists() {
		int id = displayListId;
		mapDisplayListsGL.put(id, new DisplayList());
		displayListId++;
		return id;
	}

	public static void glDeleteLists(int id) {
		DisplayList d = mapDisplayListsGL.remove(id);
		if(d != null) {
			if(d.vertexArray != null) {
				destroyGLVertexArray(d.vertexArray);
			}
			if(d.vertexBuffer != null) {
				destroyGLArrayBuffer(d.vertexBuffer);
			}
		}
	}

	public static int glGetError() {
		return _wglGetError();
	}

	public static void glBlendEquation(int equation) {
		if (equation != GlStateManager.stateBlendEquation) {
			_wglBlendEquation(equation);
			GlStateManager.stateBlendEquation = equation;
		}
	}

	public static IBufferGL createGLArrayBuffer() {
		return arrayBufferRecycler.create();
	}

	public static void destroyGLArrayBuffer(IBufferGL buffer) {
		arrayBufferRecycler.destroyObject(buffer);
	}

	public static IBufferGL createGLElementArrayBuffer() {
		return elementArrayBufferRecycler.create();
	}

	public static void destroyGLElementArrayBuffer(IBufferGL buffer) {
		elementArrayBufferRecycler.destroyObject(buffer);
	}

	public static boolean areVAOsEmulated() {
		return emulatedVAOs;
	}

	public static IVertexArrayGL createGLVertexArray() {
		if (emulatedVAOs) {
			return new SoftGLVertexArray();
		} else {
			return VAORecycler.create();
		}
	}

	public static void destroyGLVertexArray(IVertexArrayGL buffer) {
		if (!emulatedVAOs) {
			VAORecycler.destroyObject(buffer);
		}
	}

	public static void enableVertexAttribArray(int index) {
		if(!emulatedVAOs) {
			_wglEnableVertexAttribArray(index);
		}
		if (currentVertexArray != null) {
			currentVertexArray.setBit(1 << index);
		}
	}

	public static void disableVertexAttribArray(int index) {
		if(!emulatedVAOs) {
			_wglDisableVertexAttribArray(index);
		}
		if (currentVertexArray != null) {
			currentVertexArray.unsetBit(1 << index);
		}
	}

	public static void vertexAttribPointer(int index, int size, int format, boolean normalized, int stride,
			int offset) {
		if (emulatedVAOs) {
			if (currentVertexArray == null) {
				logger.warn("Skipping vertexAttribPointer with emulated VAO because no known VAO is bound!");
				return;
			}
			if (currentVAOArrayBuffer == null) {
				logger.warn("Skipping vertexAttribPointer with emulated VAO because no VAO array buffer is bound!");
				return;
			}
			((SoftGLVertexArray) currentVertexArray).setAttrib(currentVAOArrayBuffer, index, size, format, normalized,
					stride, offset);
		} else {
			_wglVertexAttribPointer(index, size, format, normalized, stride, offset);
		}
	}

	public static void vertexAttribDivisor(int index, int divisor) {
		if (emulatedVAOs) {
			if (currentVertexArray == null) {
				logger.warn("Skipping vertexAttribPointer with emulated VAO because no known VAO is bound!");
				return;
			}
			((SoftGLVertexArray) currentVertexArray).setAttribDivisor(index, divisor);
		} else {
			_wglVertexAttribDivisor(index, divisor);
		}
	}

	public static void drawArrays(int mode, int first, int count) {
		if (emulatedVAOs) {
			if (currentVertexArray == null) {
				logger.warn("Skipping draw call with emulated VAO because no known VAO is bound!");
				return;
			}
			((SoftGLVertexArray) currentVertexArray).transitionToState(emulatedVAOState, false);
		}
		_wglDrawArrays(mode, first, count);
	}

	public static void drawElements(int mode, int count, int type, int offset) {
		if (emulatedVAOs) {
			if (currentVertexArray == null) {
				logger.warn("Skipping draw call with emulated VAO because no known VAO is bound!");
				return;
			}
			((SoftGLVertexArray) currentVertexArray).transitionToState(emulatedVAOState, true);
		}
		_wglDrawElements(mode, count, type, offset);
	}
	
	public static void drawRangeElements(int mode, int start, int end, int count, int type, int offset) {
		if(emulatedVAOs) {
			if(currentVertexArray == null) {
				logger.warn("Skipping draw call with emulated VAO because no known VAO is bound!");
				return;
			}
			((SoftGLVertexArray)currentVertexArray).transitionToState(emulatedVAOState, true);
		}
		if(glesVers >= 300) {
			_wglDrawRangeElements(mode, start, end, count, type, offset);
		}else {
			_wglDrawElements(mode, count, type, offset);
		}
	}

	public static void drawArraysInstanced(int mode, int first, int count, int instances) {
		if (emulatedVAOs) {
			if (currentVertexArray == null) {
				logger.warn("Skipping instanced draw call with emulated VAO because no known VAO is bound!");
				return;
			}
			((SoftGLVertexArray) currentVertexArray).transitionToState(emulatedVAOState, false);
		}
		_wglDrawArraysInstanced(mode, first, count, instances);
	}

	public static void drawElementsInstanced(int mode, int count, int type, int offset, int instances) {
		if (emulatedVAOs) {
			if (currentVertexArray == null) {
				logger.warn("Skipping instanced draw call with emulated VAO because no known VAO is bound!");
				return;
			}
			((SoftGLVertexArray) currentVertexArray).transitionToState(emulatedVAOState, true);
		}
		_wglDrawElementsInstanced(mode, count, type, offset, instances);
	}

	static IVertexArrayGL currentVertexArray = null;

	public static void bindGLVertexArray(IVertexArrayGL buffer) {
		if (emulatedVAOs) {
			currentVertexArray = buffer;
		} else {
			if (currentVertexArray != buffer) {
				_wglBindVertexArray(buffer);
				currentVertexArray = buffer;
			}
		}
	}

	static IBufferGL currentArrayBuffer = null;

	// only used when VAOs are emulated
	static IBufferGL currentVAOArrayBuffer = null;

	/**
	 * Binds a buffer to use only for calls to vertexAttribPointer
	 */
	public static void bindVAOGLArrayBuffer(IBufferGL buffer) {
		if (emulatedVAOs) {
			currentVAOArrayBuffer = buffer;
		} else {
			if (currentArrayBuffer != buffer) {
				_wglBindBuffer(GL_ARRAY_BUFFER, buffer);
				currentArrayBuffer = buffer;
			}
		}
	}

	/**
	 * Binds a buffer to use for calls to vertexAttribPointer and the
	 * GL_ARRAY_BUFFER target
	 */
	public static void bindVAOGLArrayBufferNow(IBufferGL buffer) {
		if (emulatedVAOs) {
			currentVAOArrayBuffer = buffer;
		}
		if (currentArrayBuffer != buffer) {
			_wglBindBuffer(GL_ARRAY_BUFFER, buffer);
			currentArrayBuffer = buffer;
		}
	}

	/**
	 * Binds an index buffer to the current vertex array
	 */
	public static void bindVAOGLElementArrayBuffer(IBufferGL buffer) {
		if (emulatedVAOs) {
			if (currentVertexArray == null) {
				logger.warn("Skipping set element array buffer with emulated VAO because no known VAO is bound!");
				return;
			}
			((SoftGLVertexArray) currentVertexArray).setIndexBuffer(buffer);
		} else {
			_wglBindBuffer(GL_ELEMENT_ARRAY_BUFFER, buffer);
		}
	}

	static void bindVAOGLElementArrayBufferNow(IBufferGL buffer) {
		if (emulatedVAOs) {
			if (currentVertexArray == null) {
				logger.warn("Skipping set element array buffer with emulated VAO because no known VAO is bound!");
				return;
			}
			((SoftGLVertexArray) currentVertexArray).setIndexBuffer(buffer);
			if (currentEmulatedVAOIndexBuffer != buffer) {
				_wglBindBuffer(GL_ELEMENT_ARRAY_BUFFER, buffer);
				currentEmulatedVAOIndexBuffer = buffer;
			}
		} else {
			_wglBindBuffer(GL_ELEMENT_ARRAY_BUFFER, buffer);
		}
	}

	static IBufferGL currentEmulatedVAOIndexBuffer = null;

	static void bindEmulatedVAOIndexBuffer(IBufferGL buffer) {
		if (currentEmulatedVAOIndexBuffer != buffer) {
			_wglBindBuffer(GL_ELEMENT_ARRAY_BUFFER, buffer);
			currentEmulatedVAOIndexBuffer = buffer;
		}
	}

	/**
	 * Binds a buffer to the GL_ARRAY_BUFFER target for use not related to
	 * vertexAttribPointer
	 */
	public static void bindGLArrayBuffer(IBufferGL buffer) {
		if (currentArrayBuffer != buffer) {
			_wglBindBuffer(GL_ARRAY_BUFFER, buffer);
			currentArrayBuffer = buffer;
		}
	}

	static IBufferGL currentUniformBuffer = null;

	/**
	 * Binds a buffer to the GL_UNIFORM_BUFFER target
	 */
	public static void bindGLUniformBuffer(IBufferGL buffer) {
		if (currentUniformBuffer != buffer) {
			_wglBindBuffer(0x8A11, buffer);
			currentUniformBuffer = buffer;
		}
	}

	static IProgramGL currentShaderProgram = null;

	public static void bindGLShaderProgram(IProgramGL prog) {
		if (currentShaderProgram != prog) {
			_wglUseProgram(prog);
			currentShaderProgram = prog;
		}
	}

	private static final IBufferGL[] currentUniformBlockBindings = new IBufferGL[16];
	private static final int[] currentUniformBlockBindingOffset = new int[16];
	private static final int[] currentUniformBlockBindingSize = new int[16];

	public static void bindUniformBufferRange(int index, IBufferGL buffer, int offset, int size) {
		if (currentUniformBlockBindings[index] != buffer || currentUniformBlockBindingOffset[index] != offset
				|| currentUniformBlockBindingSize[index] != size) {
			_wglBindBufferRange(0x8A11, index, buffer, offset, size);
			currentUniformBlockBindings[index] = buffer;
			currentUniformBlockBindingOffset[index] = offset;
			currentUniformBlockBindingSize[index] = size;
		}
	}

	public static final int CLEAR_BINDING_TEXTURE = 1;
	public static final int CLEAR_BINDING_TEXTURE0 = 2;
	public static final int CLEAR_BINDING_ACTIVE_TEXTURE = 4;
	public static final int CLEAR_BINDING_VERTEX_ARRAY = 8;
	public static final int CLEAR_BINDING_ARRAY_BUFFER = 16;
	public static final int CLEAR_BINDING_SHADER_PROGRAM = 32;

	public static void clearCurrentBinding(int mask) {
		if ((mask & CLEAR_BINDING_TEXTURE) != 0) {
			int[] i = GlStateManager.boundTexture;
			for (int j = 0; j < i.length; ++j) {
				i[j] = -1;
			}
		}
		if ((mask & CLEAR_BINDING_TEXTURE0) != 0) {
			GlStateManager.boundTexture[0] = -1;
		}
		if ((mask & CLEAR_BINDING_ACTIVE_TEXTURE) != 0) {
			GlStateManager.activeTexture = 0;
			_wglActiveTexture(GL_TEXTURE0);
		}
		if ((mask & CLEAR_BINDING_VERTEX_ARRAY) != 0) {
			currentVertexArray = null;
		}
		if ((mask & CLEAR_BINDING_ARRAY_BUFFER) != 0) {
			currentArrayBuffer = currentVAOArrayBuffer = null;
		}
		if ((mask & CLEAR_BINDING_SHADER_PROGRAM) != 0) {
			currentShaderProgram = null;
		}
	}

	public static final int ATTRIB_TEXTURE = 1;
	public static final int ATTRIB_COLOR = 2;
	public static final int ATTRIB_NORMAL = 4;
	public static final int ATTRIB_LIGHTMAP = 8;

	public static void renderBuffer(ByteBuffer buffer, int attrib, int mode, int count) {
		if (currentList != null) {
			if (currentList.attribs == -1) {
				currentList.attribs = attrib;
			} else if (currentList.attribs != attrib) {
				throw new UnsupportedOperationException(
						"Inconsistent vertex format in display list (only one is allowed)");
			}
			if (currentList.mode == -1) {
				currentList.mode = mode;
			} else if (currentList.mode != mode) {
				throw new UnsupportedOperationException("Inconsistent draw mode in display list (only one is allowed)");
			}
			currentList.count += count;
			if (buffer.remaining() > displayListBuffer.remaining()) {
				growDisplayListBuffer(buffer.remaining());
			}
			displayListBuffer.put(buffer);
			lastRender = null;
		} else {
			lastRender = FixedFunctionPipeline.setupDirect(buffer, attrib, mode == GL_QUADS).update();
			lastRender.drawDirectArrays(mode, 0, count);
			lastMode = mode;
			lastCount = count;
		}
	}

	private static long lastRecyclerFlush = 0l;

	public static void optimize() {
		long millis = EagRuntime.steadyTimeMillis();
		if (millis - lastRecyclerFlush > 120000l) {
			lastRecyclerFlush = millis;
			arrayBufferRecycler.compact();
			elementArrayBufferRecycler.compact();
			VAORecycler.compact();
		}
	}

	private static FixedFunctionPipeline lastRender = null;
	private static int lastMode = 0;
	private static int lastCount = 0;

	public static void renderAgain() {
		if (lastRender == null) {
			throw new UnsupportedOperationException(
					"Cannot render the same verticies twice while generating display list");
		}
		EaglercraftGPU.bindGLVertexArray(lastRender.getDirectModeVertexArray());
		lastRender.update().drawDirectArrays(lastMode, 0, lastCount);
	}
	
	public static final int quad16MaxVertices = 65536;

	private static IBufferGL quad16EmulationBuffer = null;

	private static IBufferGL quad32EmulationBuffer = null;
	private static int quad32EmulationBufferSize = 0;

	public static void attachQuad16EmulationBuffer(boolean bind) {
		IBufferGL buf = quad16EmulationBuffer;
		if (buf == null) {
			quad16EmulationBuffer = buf = _wglGenBuffers();
			EaglercraftGPU.bindVAOGLElementArrayBufferNow(buf);
			resizeQuad16EmulationBuffer(quad16MaxVertices >> 2);
		} else if (bind) {
			EaglercraftGPU.bindVAOGLElementArrayBuffer(buf);
		}
	}

	public static void attachQuad32EmulationBuffer(int vertexCount, boolean bind) {
		IBufferGL buf = quad32EmulationBuffer;
		if (buf == null) {
			quad32EmulationBuffer = buf = _wglGenBuffers();
			int newSize = quad32EmulationBufferSize = (vertexCount + 0xFFFF) & 0xFFFF0000;
			EaglercraftGPU.bindVAOGLElementArrayBufferNow(buf);
			resizeQuad32EmulationBuffer(newSize >> 2);
		} else {
			int cnt = quad32EmulationBufferSize;
			if (cnt < vertexCount) {
				int newSize = quad32EmulationBufferSize = (vertexCount + 0xFFFF) & 0xFFFF0000;
				EaglercraftGPU.bindVAOGLElementArrayBufferNow(buf);
				resizeQuad32EmulationBuffer(newSize >> 2);
			} else if (bind) {
				EaglercraftGPU.bindVAOGLElementArrayBuffer(buf);
			}
		}
	}

	private static void resizeQuad16EmulationBuffer(int quadCount) {
		IntBuffer buf = EagRuntime.allocateIntBuffer(quadCount * 3);
		int v1, v2, v3, v4;
		for (int i = 0; i < quadCount; ++i) {
			v1 = i << 2;
			v2 = v1 + 1;
			v3 = v2 + 1;
			v4 = v3 + 1;
			buf.put(v1 | (v2 << 16));
			buf.put(v3 | (v1 << 16));
			buf.put(v3 | (v4 << 16));
		}
		buf.flip();
		_wglBufferData(GL_ELEMENT_ARRAY_BUFFER, buf, GL_STATIC_DRAW);
		EagRuntime.freeIntBuffer(buf);
	}

	private static void resizeQuad32EmulationBuffer(int quadCount) {
		IntBuffer buf = EagRuntime.allocateIntBuffer(quadCount * 6);
		int v1, v2, v3, v4;
		for (int i = 0; i < quadCount; ++i) {
			v1 = i << 2;
			v2 = v1 + 1;
			v3 = v2 + 1;
			v4 = v3 + 1;
			buf.put(v1);
			buf.put(v2);
			buf.put(v3);
			buf.put(v1);
			buf.put(v3);
			buf.put(v4);
		}
		buf.flip();
		_wglBufferData(GL_ELEMENT_ARRAY_BUFFER, buf, GL_STATIC_DRAW);
		EagRuntime.freeIntBuffer(buf);
	}

	public static ITextureGL getNativeTexture(int tex) {
		return mapTexturesGL.get(tex);
	}

	public static void regenerateTexture(int tex) {
		ITextureGL webglTex = mapTexturesGL.get(tex);
		if (webglTex != null) {
			GlStateManager.unbindTextureIfCached(tex);
			_wglDeleteTextures(webglTex);
			mapTexturesGL.set(tex, _wglGenTextures());
		} else {
			logger.error("Tried to regenerate a missing texture!");
		}
	}

	public static void drawHighPoly(HighPolyMesh mesh) {
		if (mesh.vertexCount == 0 || mesh.indexCount == 0 || mesh.vertexArray == null) {
			return;
		}
		FixedFunctionPipeline p = FixedFunctionPipeline.setupRenderDisplayList(mesh.getAttribBits()).update();
		EaglercraftGPU.bindGLVertexArray(mesh.vertexArray);
		p.drawRangeElements(GL_TRIANGLES, 0, mesh.vertexCount - 1, mesh.indexCount, GL_UNSIGNED_SHORT, 0);
	}

	static int glesVers = -1;
	static boolean hasFramebufferHDR16FSupport = false;
	static boolean hasFramebufferHDR32FSupport = false;
	static boolean hasLinearHDR16FSupport = false;
	static boolean hasLinearHDR32FSupport = false;
	static boolean fboRenderMipmapCapable = false;
	static boolean vertexArrayCapable = false;
	static boolean instancingCapable = false;
	static boolean texStorageCapable = false;
	static boolean textureLODCapable = false;
	static boolean shader5Capable = false;
	static boolean npotCapable = false;
	static int uniformBufferOffsetAlignment = -1;

	public static void createFramebufferHDR16FTexture(int target, int level, int w, int h, int format,
			boolean allow32bitFallback) {
		createFramebufferHDR16FTexture(target, level, w, h, format, allow32bitFallback, null);
	}

	public static void createFramebufferHDR16FTexture(int target, int level, int w, int h, int format,
			ByteBuffer pixelData) {
		createFramebufferHDR16FTexture(target, level, w, h, format, false, pixelData);
	}

	private static void createFramebufferHDR16FTexture(int target, int level, int w, int h, int format,
			boolean allow32bitFallback, ByteBuffer pixelData) {
		if (hasFramebufferHDR16FSupport) {
			int internalFormat;
			switch (format) {
			case GL_RED:
				if (glesVers == 200) {
					format = GL_LUMINANCE;
					internalFormat = GL_LUMINANCE;
				} else {
					internalFormat = glesVers == 200 ? GL_LUMINANCE : 0x822D; // GL_R16F
				}
				break;
			case 0x8227: // GL_RG
				internalFormat = glesVers == 200 ? 0x8227 : 0x822F; // GL_RG16F
			case GL_RGB:
				throw new UnsupportedOperationException(
						"GL_RGB16F isn't supported specifically in WebGL 2.0 for some goddamn reason");
			case GL_RGBA:
				internalFormat = glesVers == 200 ? GL_RGBA : 0x881A; // GL_RGBA16F
				break;
			default:
				throw new UnsupportedOperationException("Unknown format: " + format);
			}
			_wglTexImage2Du16(target, level, internalFormat, w, h, 0, format, glesVers == 200 ? 0x8D61 : 0x140B,
					pixelData);
		} else {
			if (allow32bitFallback) {
				if (hasFramebufferHDR32FSupport) {
					createFramebufferHDR32FTexture(target, level, w, h, format, false, null);
				} else {
					throw new UnsupportedOperationException(
							"No fallback 32-bit HDR (floating point) texture support is available on this device");
				}
			} else {
				throw new UnsupportedOperationException(
						"16-bit HDR (floating point) textures are not supported on this device");
			}
		}
	}

	public static void createFramebufferHDR32FTexture(int target, int level, int w, int h, int format,
			boolean allow16bitFallback) {
		createFramebufferHDR32FTexture(target, level, w, h, format, allow16bitFallback, null);
	}

	public static void createFramebufferHDR32FTexture(int target, int level, int w, int h, int format,
			ByteBuffer pixelData) {
		createFramebufferHDR32FTexture(target, level, w, h, format, false, pixelData);
	}

	private static void createFramebufferHDR32FTexture(int target, int level, int w, int h, int format,
			boolean allow16bitFallback, ByteBuffer pixelData) {
		if (hasFramebufferHDR32FSupport) {
			int internalFormat;
			switch (format) {
			case GL_RED:
				internalFormat = 0x822E; // GL_R32F
				break;
			case 0x8227: // GL_RG
				internalFormat = 0x8230; // GL_RG32F
			case GL_RGB:
				throw new UnsupportedOperationException(
						"GL_RGB32F isn't supported specifically in WebGL 2.0 for some goddamn reason");
			case GL_RGBA:
				internalFormat = 0x8814; // GL_RGBA32F
				break;
			default:
				throw new UnsupportedOperationException("Unknown format: " + format);
			}
			_wglTexImage2Df32(target, level, internalFormat, w, h, 0, format, GL_FLOAT, pixelData);
		} else {
			if (allow16bitFallback) {
				if (hasFramebufferHDR16FSupport) {
					createFramebufferHDR16FTexture(target, level, w, h, format, false);
				} else {
					throw new UnsupportedOperationException(
							"No fallback 16-bit HDR (floating point) texture support is available on this device");
				}
			} else {
				throw new UnsupportedOperationException(
						"32-bit HDR (floating point) textures are not supported on this device");
			}
		}
	}

	public static void warmUpCache() {
		EaglercraftGPU.glGetString(7936);
		EaglercraftGPU.glGetString(7937);
		EaglercraftGPU.glGetString(7938);
		glesVers = PlatformOpenGL.checkOpenGLESVersion();
		vertexArrayCapable = PlatformOpenGL.checkVAOCapable();
		emulatedVAOs = !vertexArrayCapable;
		fboRenderMipmapCapable = PlatformOpenGL.checkFBORenderMipmapCapable();
		instancingCapable = PlatformOpenGL.checkInstancingCapable();
		texStorageCapable = PlatformOpenGL.checkTexStorageCapable();
		textureLODCapable = PlatformOpenGL.checkTextureLODCapable();
		shader5Capable = PlatformOpenGL.checkOESGPUShader5Capable() || PlatformOpenGL.checkEXTGPUShader5Capable();
		npotCapable = PlatformOpenGL.checkNPOTCapable();
		uniformBufferOffsetAlignment = glesVers >= 300 ? _wglGetInteger(0x8A34) : -1;
		if (!npotCapable) {
			logger.warn(
					"NPOT texture support detected as false, texture wrapping must be set to GL_CLAMP_TO_EDGE if the texture's width or height is not a power of 2");
		}
		hasFramebufferHDR16FSupport = PlatformOpenGL.checkHDRFramebufferSupport(16);
		if (hasFramebufferHDR16FSupport) {
			logger.info("16-bit HDR render target support: true");
		} else {
			logger.error("16-bit HDR render target support: false");
		}
		hasLinearHDR16FSupport = PlatformOpenGL.checkLinearHDRFilteringSupport(16);
		if (hasLinearHDR16FSupport) {
			logger.info("16-bit HDR linear filter support: true");
		} else {
			logger.error("16-bit HDR linear filter support: false");
		}
		hasFramebufferHDR32FSupport = PlatformOpenGL.checkHDRFramebufferSupport(32);
		if (hasFramebufferHDR32FSupport) {
			logger.info("32-bit HDR render target support: true");
		} else {
			logger.error("32-bit HDR render target support: false");
		}
		hasLinearHDR32FSupport = PlatformOpenGL.checkLinearHDRFilteringSupport(32);
		if (hasLinearHDR32FSupport) {
			logger.info("32-bit HDR linear filter support: true");
		} else {
			logger.error("32-bit HDR linear filter support: false");
		}
		if (!checkHasHDRFramebufferSupportWithFilter()) {
			logger.error("No HDR render target support was detected! Shaders will be disabled.");
		}
		if (emulatedVAOs) {
			logger.info("Note: Could not unlock VAOs via OpenGL extensions, emulating them instead");
		}
		if (!instancingCapable) {
			logger.info(
					"Note: Could not unlock instancing via OpenGL extensions, using slow vanilla font and particle rendering");
		}
		emulatedVAOState = emulatedVAOs ? new SoftGLVertexState() : null;
		PlatformOpenGL.enterVAOEmulationHook();
		GLSLHeader.init();
		DrawUtils.init();
		if (instancingCapable) {
			InstancedFontRenderer.initialize();
		}
		DrawUtils.vshLocal.free();
		DrawUtils.vshLocal = null;
	}

	public static void destroyCache() {
		GLSLHeader.destroy();
		DrawUtils.destroy();
		InstancedFontRenderer.destroy();
		FixedFunctionPipeline.flushCache();
		StreamBuffer.destroyPool();
		emulatedVAOs = false;
		emulatedVAOState = null;
		glesVers = -1;
		fboRenderMipmapCapable = false;
		vertexArrayCapable = false;
		instancingCapable = false;
		hasFramebufferHDR16FSupport = false;
		hasFramebufferHDR32FSupport = false;
		hasLinearHDR32FSupport = false;
		stringCache.clear();
		mapTexturesGL.clear();
		mapQueriesGL.clear();
		mapDisplayListsGL.clear();
	}

	public static int checkOpenGLESVersion() {
		return glesVers;
	}

	public static boolean checkFBORenderMipmapCapable() {
		return fboRenderMipmapCapable;
	}

	public static boolean checkVAOCapable() {
		return vertexArrayCapable;
	}

	public static boolean checkInstancingCapable() {
		return instancingCapable;
	}

	public static boolean checkTexStorageCapable() {
		return texStorageCapable;
	}

	public static boolean checkTextureLODCapable() {
		return textureLODCapable;
	}

	public static boolean checkShader5Capable() {
		return shader5Capable;
	}

	public static boolean checkNPOTCapable() {
		return npotCapable;
	}

	public static int getUniformBufferOffsetAlignment() {
		return uniformBufferOffsetAlignment;
	}

	public static boolean checkHDRFramebufferSupport(int bits) {
		switch (bits) {
		case 16:
			return hasFramebufferHDR16FSupport;
		case 32:
			return hasFramebufferHDR32FSupport;
		default:
			return false;
		}
	}

	public static boolean checkLinearHDRFilteringSupport(int bits) {
		switch (bits) {
		case 16:
			return hasLinearHDR16FSupport;
		case 32:
			return hasLinearHDR32FSupport;
		default:
			return false;
		}
	}

	public static boolean checkHasHDRFramebufferSupport() {
		return hasFramebufferHDR16FSupport || hasFramebufferHDR32FSupport;
	}

	public static boolean checkHasHDRFramebufferSupportWithFilter() {
		return (hasFramebufferHDR16FSupport && hasLinearHDR16FSupport)
				|| (hasFramebufferHDR32FSupport && hasLinearHDR32FSupport);
	}

	// legacy
	public static boolean checkLinearHDR32FSupport() {
		return hasLinearHDR32FSupport;
	}

}