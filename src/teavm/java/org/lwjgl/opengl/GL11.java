package org.lwjgl.opengl;

import org.lwjgl.util.vector.*;

import java.nio.Buffer;
import java.nio.ByteBuffer;
import java.nio.FloatBuffer;
import java.nio.IntBuffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.teavm.jso.JSBody;
import org.teavm.jso.typedarrays.ArrayBuffer;
import org.teavm.jso.typedarrays.Float32Array;
import org.teavm.jso.typedarrays.Int32Array;
import org.teavm.jso.typedarrays.Uint8Array;
import org.teavm.jso.webgl.WebGLBuffer;
import org.teavm.jso.webgl.WebGLUniformLocation;

import main.BufferArrayGL;
import main.BufferGL;
import main.GLEnums;
import main.WebGL;
import main.ProgramGL;
import main.ShaderGL;
import main.StreamBuffer.StreamBufferInstance;
import main.TextureGL;
import main.UniformGL;
import main.WebGL2RenderingContext;
import main.WebGLShader;

public class GL11 extends GLEnums {
	
	static WebGL2RenderingContext webgl;
	
	private static float alphaValue;
	private static boolean alpha;
	
	private static int currentWebGLProgram;
	
	//Uniform functions
	private static Float32Array mat2;
	private static Float32Array mat3;
	private static Float32Array mat4;
	
	private static final HashMap<Integer, TextureGL> textures;
	private static int textureIndex;
	
	private static boolean textureArray;
	private static boolean colorArray;
	private static boolean normalArray;
	
	private static boolean compilingDisplayList;
	private static DisplayList currentList = null;
	private static final HashMap<Integer, DisplayList> lists;
	private static final HashMap<Integer, DisplayList> initLists;
	
	private static BufferGL quadsToTrianglesBuffer;
	private static BufferArrayGL currentArray;
	private static int bytesUploaded;
	private static int vertexDrawn;
	private static int triangleDrawn;
	
	//Fog
	private static float fogColorR;
	private static float fogColorG;
	private static float fogColorB;
	private static float fogColorA;
	private static int fogMode;
	private static boolean fogEnabled;
	private static boolean fogPremultiply;
	private static float fogStart;
	private static float fogEnd;
	private static float fogDensity;
	
	private static boolean texture2D;
	private static boolean lighting;
	private static boolean colorMaterial;
	
	private static float normalX;
	private static float normalY;
	private static float normalZ;
	private static float tex0X;
	private static float tex0Y;
	
	private static float colorR;
	private static float colorG;
	private static float colorB;
	private static float colorA;
	
	//Matrix variables
	private static int matrixMode;
	static Matrix4f[] matModelV;
	static int matModelPointer;
	static Matrix4f[] matProjV;
	static int matProjPointer;
	static Matrix4f[] matTexV;
	static int matTexPointer;
	
	private static final Vector3f matrixVector;
	
	private static Vector4f lightPos1vec;
	private static Vector4f lightPos0vec;
	private static Vector4f lightPos0vec0;
	private static Vector4f lightPos1vec0;
	
	private static WebGLBuffer vertexBuffer;
	private static WebGLBuffer texCoordBuffer;
	
	private static int[] viewportCache;
	
	private static float materialAmbientR;
	private static float materialAmbientG;
	private static float materialAmbientB;
	private static float materialAmbientA;
	
	private static float materialDiffuseR;
	private static float materialDiffuseG;
	private static float materialDiffuseB;
	private static float materialDiffuseA;
	
	private static float materialSpecularR;
	private static float materialSpecularG;
	private static float materialSpecularB;
	private static float materialSpecularA;
	
	private static float materialEmissionR;
	private static float materialEmissionG;
	private static float materialEmissionB;
	private static float materialEmissionA;

	private static float materialBackAmbientR;
	private static float materialBackAmbientG;
	private static float materialBackAmbientB;
	private static float materialBackAmbientA;
	
	private static float materialBackDiffuseR;
	private static float materialBackDiffuseG;
	private static float materialBackDiffuseB;
	private static float materialBackDiffuseA;
	
	private static float materialBackSpecularR;
	private static float materialBackSpecularG;
	private static float materialBackSpecularB;
	private static float materialBackSpecularA;
	
	private static float materialBackEmissionR;
	private static float materialBackEmissionG;
	private static float materialBackEmissionB;
	private static float materialBackEmissionA;
	 
	public static final void glAlphaFunc(int func, float ref) {
		//only GL_GREATER is supported so the first param is ignored
		alphaValue = ref;
	}
	
	public static final void glClearColor(float red, float green, float blue, float alpha) {
		webgl.clearColor(red, green, blue, alpha);
	}
	
	public static final void glClear(int mask) {
		webgl.clear(mask);
	}
	
	public static final void glScissor(int x, int y, int width, int height) {
		if(glIsEnabled(WebGL2RenderingContext.SCISSOR_TEST)) {
			webgl.scissor(x, y, width, height);
		}
	}
	
	public static final void glFlush() {
		webgl.flush();
	}
	
	public static final void glCallLists(int size, int type, Buffer listsBuffer) {
		IntBuffer listsIntBuffer = (IntBuffer)listsBuffer;
		
		while (listsIntBuffer.hasRemaining()) {
			glCallList(listsIntBuffer.get());
		}
	}
	
	public static final void glCallLists(Buffer listsBuffer) {
		IntBuffer listsIntBuffer = (IntBuffer)listsBuffer;
		
		while (listsIntBuffer.hasRemaining()) {
			glCallList(listsIntBuffer.get());
		}
	}
	
	private static final void glDrawQuadArrays(int p2, int p3) {
		if (quadsToTrianglesBuffer == null) {
			IntBuffer upload = IntBuffer.wrap(new int[98400 / 2]);
			for (int i = 0; i < 16384; ++i) {
				int v1 = i * 4;
				int v2 = i * 4 + 1;
				int v3 = i * 4 + 2;
				int v4 = i * 4 + 3;
				upload.put(v1 | (v2 << 16));
				upload.put(v4 | (v2 << 16));
				upload.put(v3 | (v4 << 16));
			}
			upload.flip();
			quadsToTrianglesBuffer = glCreateBuffer();
			glBindBuffer(WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER, quadsToTrianglesBuffer);
			glBufferData0(WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER, upload, WebGL2RenderingContext.STATIC_DRAW);
		}
		if (!currentArray.isQuadBufferBound) {
			currentArray.isQuadBufferBound = true;
			glBindBuffer(WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER, quadsToTrianglesBuffer);
		}
		glDrawElements(WebGL2RenderingContext.TRIANGLES, p3 * 6 / 4, WebGL2RenderingContext.UNSIGNED_SHORT, p2 * 6 / 4);
	}
	
	public static final void glBindVertexArray0(BufferArrayGL p1) {
		currentArray = p1;
		if(p1 == null) {
			webgl.bindVertexArray(null);
			return;
		}
		webgl.bindVertexArray(p1.obj);
	}
	
	private static int displayListId = 0;
	public static final int glGenLists(int range) {
		int base = displayListId + 1;
		for (int i = 0; i < range; i++) {
			int id = ++displayListId;
			lists.put(id, new DisplayList(id));
		}
		return base;
	}
	
	public static final void glNewList(int list, int mode) {
		if (!compilingDisplayList) {
			currentList = lists.get(list);
			if (currentList != null) {
				currentList.mode = -1;
				currentList.length = 0;
				compilingDisplayList = true;
			}
		}
	}
	
	public static final void glCallList(int list) {
		if (!compilingDisplayList) {
			DisplayList d = initLists.get(list);
			if (d != null && d.length > 0 && d.currentBuffer != null) {
				if(d.drawMode == GL_QUADS) {
					glBindShaders(d.mode | glGetShaderMode1());
					glBindVertexArray0(d.array);
					
					for(MatrixMode m : d.matrixMode) {
						if(m.type == 1) {
							matrixVector.set(m.x, m.y, m.z);
							getMatrix().translate(matrixVector);
						} else if(m.type == 2) {
							matrixVector.set(m.x, m.y, m.z);
							getMatrix().rotate(m.angle * rad, matrixVector);
						} else if(m.type == 3) {
							matrixVector.set(m.x, m.y, m.z);
							getMatrix().scale(matrixVector);
						} else {
							throw new IllegalArgumentException("Unsupported matrix mode in display list");
						}
					}
					
					glDrawQuadArrays(0, d.length);
					vertexDrawn += d.length * 6 / 4;
					triangleDrawn += d.length / 2;
				} else {
					int bl = glArrayByteLength(d.currentBuffer);
					bytesUploaded += bl;
					vertexDrawn += d.count;

					glBindShaders();

					StreamBufferInstance sb = shaderWebGL.streamBuffer.getBuffer(bl);
					glBindVertexArray0(sb.vertexArray);
					glBindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, sb.vertexBuffer);
					if (!shaderWebGL.bufferIsInitialized) {
						shaderWebGL.bufferIsInitialized = true;
						glBufferData(WebGL2RenderingContext.ARRAY_BUFFER, blankUploadArray, WebGL2RenderingContext.DYNAMIC_DRAW);
					}
					glBufferSubData(WebGL2RenderingContext.ARRAY_BUFFER, 0, d.currentBuffer);
					
					for(MatrixMode m : d.matrixMode) {
						if(m.type == 1) {
							matrixVector.set(m.x, m.y, m.z);
							getMatrix().translate(matrixVector);
						} else if(m.type == 2) {
							matrixVector.set(m.x, m.y, m.z);
							getMatrix().rotate(m.angle * rad, matrixVector);
						} else if(m.type == 3) {
							matrixVector.set(m.x, m.y, m.z);
							getMatrix().scale(matrixVector);
						} else {
							throw new IllegalArgumentException("Unsupported matrix mode in display list");
						}
					}
					
					int drawMode = 0;
					switch (d.drawMode) {
					default:
					case GL_TRIANGLES:
						drawMode = WebGL2RenderingContext.TRIANGLES;
						triangleDrawn += d.count / 3;
						break;
					case GL_TRIANGLE_STRIP:
						drawMode = WebGL2RenderingContext.TRIANGLE_STRIP;
						triangleDrawn += d.count - 2;
						break;
					case GL_TRIANGLE_FAN:
						drawMode = WebGL2RenderingContext.TRIANGLE_FAN;
						triangleDrawn += d.count - 2;
						break;
					case GL_LINE_STRIP:
						drawMode = WebGL2RenderingContext.LINE_STRIP;
						triangleDrawn += d.count - 1;
						break;
					case GL_LINES:
						drawMode = WebGL2RenderingContext.LINES;
						triangleDrawn += d.count / 2;
						break;
					}
					webgl.drawArrays(drawMode, d.first, d.count);
				}
				
				shaderWebGL.unuse();
			}
		}
	}
	
	public static final void glEndList() {
		if (compilingDisplayList) {
			compilingDisplayList = false;
			Object upload = glGetLowLevelBuffersAppended();
			int l = glArrayByteLength(upload);
			if (l > 0) {
				if (currentList.buffer == null) {
					initLists.put(currentList.id, currentList);
					currentList.array = glCreateVertexArray();
					currentList.buffer = glCreateBuffer();
					WebGLShader f = WebGLShader.instance(currentList.mode);
					glBindVertexArray0(currentList.array);
					glBindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, currentList.buffer);
					f.setupArrayForProgram();
				}
				glBindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, currentList.buffer);
				glBufferData(WebGL2RenderingContext.ARRAY_BUFFER, upload, WebGL2RenderingContext.STATIC_DRAW);
				bytesUploaded += l;
			}
		}
	}
	
	public static final void glDeleteLists(int list, int range) {
		for (int i = 0; i < range; i++) {
			DisplayList d = initLists.remove(list + i);
			if (d != null) {
				glDeleteVertexArray(d.array);
				glDeleteBuffer(d.buffer);
			}
			lists.remove(list + i);
		}
	}
	
	public static final void glMultiTexCoord2f(int p1, float p2, float p3) {
		tex0X = p2;
		tex0Y = p3;
	}
	
	public static final void glBlendFunc(int sFactor, int dFactor) {
		fogPremultiply = (sFactor == GL_ONE && dFactor == GL_ONE_MINUS_SRC_ALPHA);
		webgl.blendFunc(sFactor, dFactor);
	}
	
	public static final void glBindTexture(int p1, TextureGL p2) {
		if(p2 == null) {
			webgl.bindTexture(WebGL2RenderingContext.TEXTURE_2D, null);
		}
		webgl.bindTexture(WebGL2RenderingContext.TEXTURE_2D, p2.obj);
	}
	
	public static final void glBindTexture(int target, int texture) {
		TextureGL t = textures.get(texture);
		if(t == null) {
			webgl.bindTexture(WebGL2RenderingContext.TEXTURE_2D, null);
			return;
		}
 		webgl.bindTexture(WebGL2RenderingContext.TEXTURE_2D, t.obj);
	}
	
	public static final void glBegin(int mode) {
		ImmediateModeData.instance.begin(mode);
	}
	
	public static final void glTexCoord2f(float s, float t) {
		ImmediateModeData.instance.setTextureUV(s, t);
	}
	
	public static final void glTexCoord2d(double s, double t) {
		glTexCoord2f((float)s, (float)t);
	}
	
	public static final void glTexCoord2i(int s, int t) {
		glTexCoord2f(s, t);
	}
	
	public static final void glVertex2f(float x, float y) {
		glVertex3f(x, y, 0.0f);
	}
	
	public static final void glVertex2d(double x, double y) {
		glVertex2f((float)x, (float)y);
	}
	
	public static final void glVertex2i(int x, int y) {
		glVertex2f(x, y);
	}
	
	public static final void glVertex3f(float x, float y, float z) {
		ImmediateModeData.instance.vertex(x, y, z);
	}
	
	public static final void glVertex3d(double x, double y, double z) {
		glVertex3f((float)x, (float)y, (float)z);
	}
	
	public static final void glVertex3i(int x, int y, int z) {
		glVertex3f(x, y, z);
	}
	
	public static final void glEnd() {
		ImmediateModeData.instance.end();
	}
	
	public static final void glLineWidth(float width) {
		webgl.lineWidth(width);
	}
	
	public static final void glClearDepth(double depth) {
		webgl.clearDepth((float)(1.0F-depth));
	}
	
	public static final void glClearDepth(float depth) {
		webgl.clearDepth(1.0F-depth);
	}
	
	public static final void glDrawElements(int mode, int type, int count, int offset) {
		webgl.drawElements(mode, type, count, offset);
	}
	
	//Code pulled from eagler b1.3's EaglerAdapter
	private static Object blankUploadArray = Int32Array.create(525000);
	public static final void glDrawArrays(int mode, int first, int count, Object buffer) {
		if (compilingDisplayList) {
			if (currentList.mode == -1) {
				currentList.mode = glGetShaderMode0();
			} else {
				if (currentList.mode != glGetShaderMode0()) {
					System.err.println("vertex format inconsistent in display list");
				}
			}
			currentList.length += count;
			currentList.drawMode = mode;
			currentList.first = first;
			currentList.count = count;
			currentList.currentBuffer = buffer;
			glAppendLowLevelBuffer(buffer);
		} else {
			int bl = glArrayByteLength(buffer);
			bytesUploaded += bl;
			vertexDrawn += count;

			glBindShaders();

			StreamBufferInstance sb = shaderWebGL.streamBuffer.getBuffer(bl);
			glBindVertexArray0(sb.vertexArray);
			glBindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, sb.vertexBuffer);
			if (!shaderWebGL.bufferIsInitialized) {
				shaderWebGL.bufferIsInitialized = true;
				glBufferData(WebGL2RenderingContext.ARRAY_BUFFER, blankUploadArray, WebGL2RenderingContext.DYNAMIC_DRAW);
			}
			glBufferSubData(WebGL2RenderingContext.ARRAY_BUFFER, 0, buffer);

			if (mode == GL_QUADS) {
				glDrawQuadArrays(first, count);
				triangleDrawn += count / 2;
			} else {
				int drawMode = 0;
				switch (mode) {
				default:
				case GL_TRIANGLES:
					drawMode = WebGL2RenderingContext.TRIANGLES;
					triangleDrawn += count / 3;
					break;
				case GL_TRIANGLE_STRIP:
					drawMode = WebGL2RenderingContext.TRIANGLE_STRIP;
					triangleDrawn += count - 2;
					break;
				case GL_TRIANGLE_FAN:
					drawMode = WebGL2RenderingContext.TRIANGLE_FAN;
					triangleDrawn += count - 2;
					break;
				case GL_LINE_STRIP:
					drawMode = WebGL2RenderingContext.LINE_STRIP;
					triangleDrawn += count - 1;
					break;
				case GL_LINES:
					drawMode = WebGL2RenderingContext.LINES;
					triangleDrawn += count / 2;
					break;
				}
				webgl.drawArrays(drawMode, first, count);
			}

			shaderWebGL.unuse();

		}
	}

	public static final void glDrawArrays(int mode, int first, int count) {
		if(mode == GL_QUADS && (count % 4) == 0) {
			for(int i=0; i < count; i += 4) {
				webgl.drawArrays(GL_TRIANGLE_FAN, i, 4);
			}
		} else {
			
			if(mode == GL_QUADS) {
				glDrawQuadArrays(first, count);
				triangleDrawn += count / 2;
			} else {
			
			int drawMode = 0;
			switch (mode) {
				default:
				case GL_TRIANGLES:
					drawMode = WebGL2RenderingContext.TRIANGLES;
					triangleDrawn += count / 3;
					break;
				case GL_TRIANGLE_STRIP:
					drawMode = WebGL2RenderingContext.TRIANGLE_STRIP;
					triangleDrawn += count - 2;
					break;
				case GL_TRIANGLE_FAN:
					drawMode = WebGL2RenderingContext.TRIANGLE_FAN;
					triangleDrawn += count - 2;
					break;
				case GL_LINE_STRIP:
					drawMode = WebGL2RenderingContext.LINE_STRIP;
					triangleDrawn += count - 1;
					break;
				case GL_LINES:
					drawMode = WebGL2RenderingContext.LINES;
					triangleDrawn += count / 2;
					break;
				}
				webgl.drawArrays(drawMode, first, count);
			}
		}
	}
	
	public static final void glEnableClientState(int cap) {
		switch(cap) {
			case GL_TEXTURE_COORD_ARRAY:
				textureArray = true;
				break;
				
			case GL_COLOR_ARRAY:
				colorArray = true;
				break;
				
			case GL_NORMAL_ARRAY:
				normalArray = true;
				break;
				
			default:
				break;
		}
	}
	
	public static final void glDisableClientState(int cap) {
		switch(cap) {
			case GL_TEXTURE_COORD_ARRAY:
				textureArray = false;
				break;
				
			case GL_COLOR_ARRAY:
				colorArray = false;
				break;
				
			case GL_NORMAL_ARRAY:
				normalArray = false;
				break;
				
			default:
				break;
		}
	}
	
	public static final void glEnable(int cap) {
		switch(cap) {
			case GL_RESCALE_NORMAL:
				break;
			case GL_TEXTURE_2D:
				texture2D = true;
				break;
			case GL_LIGHTING:
				lighting = true;
				break;
			case GL_ALPHA_TEST:
				alpha = true;
				break;
			case GL_FOG:
				fogEnabled = true;
				break;
			case GL_COLOR_MATERIAL:
				colorMaterial = true;
				break;
			case GL_DEPTH_TEST:
				webgl.enable(WebGL2RenderingContext.DEPTH_TEST);
			case GL_CULL_FACE:
				webgl.enable(WebGL2RenderingContext.CULL_FACE);
			case GL_BLEND:
				webgl.enable(WebGL2RenderingContext.BLEND);
			case GL_POLYGON_OFFSET_FILL:
				webgl.enable(WebGL2RenderingContext.POLYGON_OFFSET_FILL);
			case GL_SCISSOR_TEST:
				webgl.enable(WebGL2RenderingContext.SCISSOR_TEST);
			default:
				//webgl.enable(cap);
				break;
		}
	}
	
	public static final void glDisable(int cap) {
		switch(cap) {
			case GL_RESCALE_NORMAL:
				break;
			case GL_TEXTURE_2D:
				texture2D = false;
				break;
			case GL_LIGHTING:
				lighting = false;
				break;
			case GL_ALPHA_TEST:
				alpha = false;
				break;
			case GL_FOG:
				fogEnabled = false;
				break;
			case GL_COLOR_MATERIAL:
				colorMaterial = false;
				break;
			case GL_DEPTH_TEST:
				webgl.disable(WebGL2RenderingContext.DEPTH_TEST);
			case GL_CULL_FACE:
				webgl.disable(WebGL2RenderingContext.CULL_FACE);
			case GL_BLEND:
				webgl.disable(WebGL2RenderingContext.BLEND);
			case GL_POLYGON_OFFSET_FILL:
				webgl.disable(WebGL2RenderingContext.POLYGON_OFFSET_FILL);
			case GL_SCISSOR_TEST:
				webgl.disable(WebGL2RenderingContext.SCISSOR_TEST);
			default:
				//webgl.disable(cap);
				break;
		}
	}
	
	public static final boolean glIsEnabled(int cap) {
		switch(cap) {
			case GL_RESCALE_NORMAL:
				return false;
			case GL_TEXTURE_2D:
				return texture2D;
			case GL_LIGHTING:
				return lighting;
			case GL_ALPHA_TEST:
				return alpha;
			case GL_FOG:
				return fogEnabled;
			case GL_COLOR_MATERIAL:
				return colorMaterial;
			case GL_DEPTH_TEST:
				return webgl.isEnabled(WebGL2RenderingContext.DEPTH_TEST);
			case GL_CULL_FACE:
				return webgl.isEnabled(WebGL2RenderingContext.CULL_FACE);
			case GL_BLEND:
				return webgl.isEnabled(WebGL2RenderingContext.BLEND);
			case GL_POLYGON_OFFSET_FILL:
				return webgl.isEnabled(WebGL2RenderingContext.POLYGON_OFFSET_FILL);
			case GL_SCISSOR_TEST:
				return webgl.isEnabled(WebGL2RenderingContext.SCISSOR_TEST);
			default:
				return false;
		}
	}
	
	public static final void glCullFace(int cull) {
		webgl.cullFace(cull);
	}
	
	public static final void glNormal3b(byte nx, byte ny, byte nz) {
		float len = (float) Math.sqrt(nx * nx + ny * ny + nz * nz);
		normalX = nx / len;
		normalY = ny / len;
		normalZ = nz / len;
	}
	
	public static final void glNormal3f(float nx, float ny, float nz) {
		float len = (float) Math.sqrt(nx * nx + ny * ny + nz * nz);
		normalX = nx / len;
		normalY = ny / len;
		normalZ = nz / len;
	}
	
	public static final void glNormal3d(double nx, double ny, double nz) {
		float len = (float) Math.sqrt(nx * nx + ny * ny + nz * nz);
		normalX = (float) (nx / len);
		normalY = (float) (ny / len);
		normalZ = (float) (nz / len);
	}
	
	public static final void glNormal3i(int nx, int ny, int nz) {
		float len = (float) Math.sqrt(nx * nx + ny * ny + nz * nz);
		normalX = nx / len;
		normalY = ny / len;
		normalZ = nz / len;
	}
	
	public static final void glPixelStoref(int pname, float param) {
		webgl.pixelStorei(pname, pname);
	}

	public static final void glPixelStorei(int pname, int param) {
		webgl.pixelStorei(pname, pname);
	}
	
	public static final void glColor3b(float red, float green, float blue) {
		colorR = red;
		colorG = green;
		colorB = blue;
		colorA = 1.0f;
	}
	
	public static final void glColor3f(float red, float green, float blue) {
		colorR = red;
		colorG = green;
		colorB = blue;
		colorA = 1.0f;
	}
	
	public static final void glColor3d(double red, double green, double blue) {
		colorR = (float) red;
		colorG = (float) green;
		colorB = (float) blue;
		colorA = 1.0f;
	}
	
	public static final void glColor4b(byte red, byte green, byte blue, byte alpha) {
		colorR = red;
		colorG = green;
		colorB = blue;
		colorA = alpha;
	}
	
	public static final void glColor4f(float red, float green, float blue, float alpha) {
		colorR = red;
		colorG = green;
		colorB = blue;
		colorA = alpha;
	}
	
	public static final void glColor4d(double red, double green, double blue, double alpha) {
		colorR = (float) red;
		colorG = (float) green;
		colorB = (float) blue;
		colorA = (float) alpha;
	}
	
	public static final void glDepthMask(boolean flag) {
		webgl.depthMask(flag);
	}
	
	public static final void glDepthFunc(int func) {
		int func1 = WebGL2RenderingContext.GEQUAL;
		switch (func) {
		case GL_GREATER:
			func1 = WebGL2RenderingContext.LESS;
			break;
		case GL_GEQUAL:
			func1 = WebGL2RenderingContext.LEQUAL;
			break;
		case GL_EQUAL:
			func1 = WebGL2RenderingContext.EQUAL;
			break;
		case GL_LEQUAL:
			func1 = WebGL2RenderingContext.GEQUAL;
			break;
		case GL_LESS:
			func1 = WebGL2RenderingContext.GREATER;
			break;
		}
		webgl.depthFunc(func1);
	}
	
	public static final void glColorMask(boolean red, boolean green, boolean blue, boolean alpha) {
		webgl.colorMask(red, green, blue, alpha);
	}
	
	public static final void glTexParameterf(int target, int pname, float param) {
		int target2 = 0;
		switch (target) {
		default:
		case GL_TEXTURE_2D:
			target2 = WebGL2RenderingContext.TEXTURE_2D;
			break;
		}
		int pname2 = 0;
		switch (pname) {
		default:
		case GL_TEXTURE_MAX_ANISOTROPY:
			pname2 = WebGL2RenderingContext.TEXTURE_MAX_ANISOTROPY_EXT;
			break;
		}
		webgl.texParameterf(target2, pname2, param);
	}
	
	public static final void glTexParameteri(int target, int pname, int param) {
		if(param == GL_CLAMP_TO_EDGE || param == 10496) {
			param = WebGL2RenderingContext.CLAMP_TO_EDGE;
		}
		webgl.texParameteri(target, pname, param);
	}
	
	public static final void glMatrixMode(int mode) {
		matrixMode = mode;
	}

	private static final Matrix4f getMatrix() {
		switch (matrixMode) {
		case GL_MODELVIEW:
		default:
			return matModelV[matModelPointer];
		case GL_PROJECTION:
			return matProjV[matProjPointer];
		case GL_TEXTURE:
			return matTexV[matTexPointer];
		}
	}
	
	private static final Matrix4f paramMatrix = new Matrix4f();
	public static final void glMultMatrix(FloatBuffer matrix) {
		Matrix4f modeMatrix = getMatrix();
		paramMatrix.load(matrix);
		Matrix4f.mul(modeMatrix, paramMatrix, modeMatrix);
	}
	
	public static final void glLoadIdentity() {
		getMatrix().setIdentity();
	}
	
	public static final void glOrtho(float left, float right, float bottom, float top, float zNear, float zFar) {
		Matrix4f res = getMatrix();
		res.m00 = 2.0f / (right - left);
		res.m01 = 0.0f;
		res.m02 = 0.0f;
		res.m03 = 0.0f;
		res.m10 = 0.0f;
		res.m11 = 2.0f / (top - bottom);
		res.m12 = 0.0f;
		res.m13 = 0.0f;
		res.m20 = 0.0f;
		res.m21 = 0.0f;
		res.m22 = 2.0f / (zFar - zNear);
		res.m23 = 0.0f;
		res.m30 = -(right + left) / (right - left);
		res.m31 = -(top + bottom) / (top - bottom);
		res.m32 = (zFar + zNear) / (zFar - zNear);
		res.m33 = 1.0f;
	}
	
	public static final void glOrtho(double left, double right, double bottom, double top, double zNear, double zFar) {
		Matrix4f res = getMatrix();
		res.m00 = (float) (2.0f / (right - left));
		res.m01 = 0.0f;
		res.m02 = 0.0f;
		res.m03 = 0.0f;
		res.m10 = 0.0f;
		res.m11 = (float) (2.0f / (top - bottom));
		res.m12 = 0.0f;
		res.m13 = 0.0f;
		res.m20 = 0.0f;
		res.m21 = 0.0f;
		res.m22 = (float) (2.0f / (zFar - zNear));
		res.m23 = 0.0f;
		res.m30 = (float) (-(right + left) / (right - left));
		res.m31 = (float) (-(top + bottom) / (top - bottom));
		res.m32 = (float) ((zFar + zNear) / (zFar - zNear));
		res.m33 = 1.0f;
	}
	
	public static final void glTranslatef(float x, float y, float z) {
		matrixVector.set(x, y, z);
		getMatrix().translate(matrixVector);
		if (compilingDisplayList) {
			currentList.matrixMode.add(new MatrixMode(1, x, y, z));
		}
	}
	
	public static final void glTranslated(double x, double y, double z) {
		matrixVector.set((float)x, (float)y, (float)z);
		getMatrix().translate(matrixVector);
		if (compilingDisplayList) {
			currentList.matrixMode.add(new MatrixMode(1, (float)x, (float)y, (float)z));
		}
	}
	
	private static final float rad = 0.0174532925f;

	public static final void glRotatef(float angle, float x, float y, float z) {
		matrixVector.set(x, y, z);
		getMatrix().rotate(angle * rad, matrixVector);
		if (compilingDisplayList) {
			currentList.matrixMode.add(new MatrixMode(2, angle, x, y, z));
		}
	}
	
	public static final void glRotated(double angle, double x, double y, double z) {
		matrixVector.set((float)x, (float)y, (float)z);
		getMatrix().rotate((float)angle * rad, matrixVector);
		if (compilingDisplayList) {
			currentList.matrixMode.add(new MatrixMode(2, (float)angle, (float)x, (float)y, (float)z));
		}
	}
	
	public static final void glScalef(float x, float y, float z) {
		matrixVector.set(x, y, z);
		getMatrix().scale(matrixVector);
		if (compilingDisplayList) {
			currentList.matrixMode.add(new MatrixMode(3, x, y, z));
		}
	}
	
	public static final void glScaled(double x, double y, double z) {
		matrixVector.set((float)x, (float)y, (float)x);
		getMatrix().scale(matrixVector);
		if (compilingDisplayList) {
			currentList.matrixMode.add(new MatrixMode(3, (float)x, (float)y, (float)z));
		}
	}
	
	public static final void glPushMatrix() {
		switch (matrixMode) {
		case GL_MODELVIEW:
		default:
			if (matModelPointer < matModelV.length - 1) {
				++matModelPointer;
				matModelV[matModelPointer].load(matModelV[matModelPointer - 1]);
			} else {
				System.err.println("modelview matrix stack overflow");
			}
			break;
		case GL_PROJECTION:
			if (matProjPointer < matProjV.length - 1) {
				++matProjPointer;
				matProjV[matProjPointer].load(matProjV[matProjPointer - 1]);
			} else {
				System.err.println("projection matrix stack overflow");
			}
			break;
		case GL_TEXTURE:
			if (matTexPointer < matTexV.length - 1) {
				++matTexPointer;
				matTexV[matTexPointer].load(matTexV[matTexPointer - 1]);
			} else {
				System.err.println("texture matrix stack overflow");
			}
			break;
		}
	}
	
	public static final void glPopMatrix() {
		switch (matrixMode) {
		case GL_MODELVIEW:
		default:
			if (matModelPointer > 0) {
				--matModelPointer;
			} else {
				System.err.println("modelview matrix stack underflow");
			}
			break;
		case GL_PROJECTION:
			if (matProjPointer > 0) {
				--matProjPointer;
			} else {
				System.err.println("projection matrix stack underflow");
			}
			break;
		case GL_TEXTURE:
			if (matTexPointer > 0) {
				--matTexPointer;
			} else {
				System.err.println("texture matrix stack underflow");
			}
			break;
		}
	}
	
	public static final void glGetFloat(int pname, FloatBuffer param) {
		switch (pname) {
		case GL_MODELVIEW_MATRIX:
		default:
			matModelV[matModelPointer].store(param);
			break;
		case GL_PROJECTION_MATRIX:
			matProjV[matProjPointer].store(param);
			break;
		}
	}
	
	private static Uint8Array bufferUpload = Uint8Array.create(ArrayBuffer.create(4 * 1024 * 1024));
	public static final void glTexImage2D(int target, int level, int internalformat, int width, int height, int border, int format, int type, Buffer pixels) {
		if(pixels == null) {
			webgl.texImage2D(WebGL2RenderingContext.TEXTURE_2D, level, WebGL2RenderingContext.RGBA8, width, height, border, WebGL2RenderingContext.RGBA, WebGL2RenderingContext.UNSIGNED_BYTE, null);
			return;
		}
		bytesUploaded += pixels.remaining() * 4;
		if(pixels instanceof ByteBuffer) {
			int bufferLength = pixels.remaining();
			Uint8Array array = bufferUpload;
			for(int i = 0; i < bufferLength; ++i) {
				array.set(i, (short) ((int)((ByteBuffer)pixels).get() & 0xff));
			}
			Uint8Array bufferData = Uint8Array.create(bufferUpload.getBuffer(), 0, bufferLength);
			webgl.texImage2D(WebGL2RenderingContext.TEXTURE_2D, level, WebGL2RenderingContext.RGBA8, width, height, border, WebGL2RenderingContext.RGBA, WebGL2RenderingContext.UNSIGNED_BYTE, bufferData);
		} else if(pixels instanceof IntBuffer) {
			int bufferLength = pixels.remaining();
			Int32Array array = Int32Array.create(bufferUpload.getBuffer());
			for(int i = 0; i < bufferLength; ++i) {
				array.set(i, ((IntBuffer)pixels).get());
			}
			Uint8Array bufferData = Uint8Array.create(bufferUpload.getBuffer(), 0, bufferLength*4);
			webgl.texImage2D(WebGL2RenderingContext.TEXTURE_2D, level, WebGL2RenderingContext.RGBA8, width, height, border, WebGL2RenderingContext.RGBA, WebGL2RenderingContext.UNSIGNED_BYTE, bufferData);
		} else {
			System.err.println("glTexImage2D: Unsupported Buffer type!");
		}
	}
	
	public static final void glBufferData0(int p1, IntBuffer p2, int p3) {
		int len = p2.remaining();
		Int32Array array  = Int32Array.create(bufferUpload.getBuffer());
		for(int i = 0; i < len; ++i) {
			array .set(i, p2.get());
		}
		Uint8Array data = Uint8Array.create(bufferUpload.getBuffer(), 0, len*4);
		webgl.bufferData(p1, data, p3);
	}
	
	public static final void glBufferData00(int p1, long len, int p3) {
		webgl.bufferData(p1, (int)len, p3);
	}
	
	public static final void glBufferData(int p1, Object p2, int p3) {
		webgl.bufferData(p1, (Int32Array)p2, p3);
	}
	
	private static final int glGetShaderMode0() {
		int mode = 0;
		mode = (mode | (colorArray ? WebGLShader.COLOR : 0));
		mode = (mode | (normalArray ? WebGLShader.NORMAL : 0));
		mode = (mode | (textureArray ? WebGLShader.TEXTURE0 : 0));
		return mode;
	}

	private static final int glGetShaderMode1() {
		int mode = 0;
		mode = (mode | ((colorMaterial && lighting) ? WebGLShader.LIGHTING : 0));
		mode = (mode | (fogEnabled ? WebGLShader.FOG : 0));
		mode = (mode | (alpha ? WebGLShader.ALPHATEST : 0));
		mode = (mode | (texture2D ? WebGLShader.UNIT0 : 0));
		return mode;
	}
	
	private static int getShaderMode() {
		int mode = 0;
		mode = (mode | (colorArray ? WebGLShader.COLOR : 0));
		mode = (mode | (normalArray ? WebGLShader.NORMAL : 0));
		mode = (mode | (textureArray ? WebGLShader.TEXTURE0 : 0));
		mode = (mode | ((colorMaterial && lighting) ? WebGLShader.LIGHTING : 0));
		mode = (mode | (fogEnabled ? WebGLShader.FOG : 0));
		mode = (mode | (alpha ? WebGLShader.ALPHATEST : 0));
		mode = (mode | (texture2D ? WebGLShader.UNIT0 : 0));
		return mode;
	}
	
	public static final void glBindShaders() {
		glBindShaders(getShaderMode());
	}
	
	public static final void glBindShaders(int i) {
		WebGLShader s = shaderWebGL = WebGLShader.instance(i);
		s.use();
		if (alpha) {
			s.alphaTest(alphaValue);
		}
		s.color(colorR, colorG, colorB, colorA);
		if (fogEnabled) {
			s.fogMode((fogPremultiply ? 2 : 0) + fogMode);
			s.fogColor(fogColorR, fogColorG, fogColorB, fogColorA);
			s.fogDensity(fogDensity);
			s.fogStartEnd(fogStart, fogEnd);
		}
		s.modelMatrix(matModelV[matModelPointer]);
		s.projectionMatrix(matProjV[matProjPointer]);
		s.textureMatrix(matTexV[matTexPointer]);
		if (colorMaterial && lighting) {
			s.normal(normalX, normalY, normalZ);
			s.lightPositions(lightPos0vec, lightPos1vec);
		}
		s.tex0Coords(tex0X, tex0Y);
	}
	
	public static final ShaderGL glCreateShader(int p1) {
		return new ShaderGL(webgl.createShader(p1));
	}
	
	public static final ProgramGL glCreateProgram() {
		return new ProgramGL(webgl.createProgram());
	}
	
	public static final void glDetachShader(ProgramGL p1, ShaderGL p2) {
		webgl.detachShader(p1.obj, p2.obj);
	}
	
	public static final void glDeleteShader(ShaderGL p1) {
		webgl.deleteShader(p1.obj);
	}
	
	public static final void glCompileShader(ShaderGL p1) {
		webgl.compileShader(p1.obj);
	}
	
	public static final void glAttachShader(ProgramGL p1, ShaderGL p2) {
		webgl.attachShader(p1.obj, p2.obj);
	}
	
	public static final void glLinkProgram(ProgramGL p1) {
		webgl.linkProgram(p1.obj);
	}
	
	public static final void glShaderSource(ShaderGL p1, String p2) {
		webgl.shaderSource(p1.obj, p2);
	}
	
	public static final void glDeleteProgram(ProgramGL program) {
		webgl.deleteProgram(program.obj);
	}
	
	public static final String glGetShaderHeader() {
		return "#version 300 es";
	}
	
	public static final String glGetShaderInfoLog(ShaderGL p1) {
		return webgl.getShaderInfoLog(p1.obj);
	}
	
	public static final String glGetProgramInfoLog(ProgramGL p1) {
		return webgl.getProgramInfoLog(p1.obj);
	}
	
	public static final boolean glGetProgramLinked(ProgramGL p1) {
		return webgl.getProgramParameteri(p1.obj, WebGL2RenderingContext.LINK_STATUS) == 1;
	}
	
	public static final boolean glGetShaderCompiled(ShaderGL p1) {
		return webgl.getShaderParameteri(p1.obj, WebGL2RenderingContext.COMPILE_STATUS) == 1;
	}
	
	public static final void glBindAttributeLocation(ProgramGL p1, int p2, String p3) {
		webgl.bindAttribLocation(p1.obj, p2, p3);
	}
	
	public static final UniformGL glGetUniformLocation(ProgramGL p1, String p2) {
		WebGLUniformLocation u = webgl.getUniformLocation(p1.obj, p2);
		return u == null ? null : new UniformGL(u);
	}
	
	public static final void glUseProgram(ProgramGL p1) {
		if(p1 != null && currentWebGLProgram != p1.hashcode) {
			currentWebGLProgram = p1.hashcode;
			webgl.useProgram(p1.obj);
		}
	}
	
	public static final void glUniform1f(UniformGL p1, float p2) {
		if(p1 != null) webgl.uniform1f(p1.obj, p2);
	}
	
	public static final void glUniform2f(UniformGL p1, float p2, float p3) {
		if(p1 != null) webgl.uniform2f(p1.obj, p2, p3);
	}
	
	public static final void glUniform3f(UniformGL p1, float p2, float p3, float p4) {
		if(p1 != null) webgl.uniform3f(p1.obj, p2, p3, p4);
	}
	
	public static final void glUniform4f(UniformGL p1, float p2, float p3, float p4, float p5) {
		if(p1 != null) webgl.uniform4f(p1.obj, p2, p3, p4, p5);
	}
	
	public static final void glUniform1i(UniformGL p1, int p2) {
		if(p1 != null) webgl.uniform1i(p1.obj, p2);
	}
	
	public static final void glUniform2i(UniformGL p1, int p2, int p3) {
		if(p1 != null) webgl.uniform2i(p1.obj, p2, p3);
	}
	
	public static final void glUniform3i(UniformGL p1, int p2, int p3, int p4) {
		if(p1 != null) webgl.uniform3i(p1.obj, p2, p3, p4);
	}
	
	public static final void glUniform4i(UniformGL p1, int p2, int p3, int p4, int p5) {
		if(p1 != null) webgl.uniform4i(p1.obj, p2, p3, p4, p5);
	}
	
	public static final void glUniformMat2fv(UniformGL p1, float[] mat) {
		mat2.set(mat);
		if(p1 != null) webgl.uniformMatrix2fv(p1.obj, false, mat2);
	}
	
	public static final void glUniformMat3fv(UniformGL p1, float[] mat) {
		mat3.set(mat);
		if(p1 != null) webgl.uniformMatrix3fv(p1.obj, false, mat3);
	}
	
	public static final void glUniformMat4fv(UniformGL p1, float[] mat) {
		mat4.set(mat);
		if(p1 != null) webgl.uniformMatrix4fv(p1.obj, false, mat4);
	}
	
	public static final void glEnableVertexAttribArray(int p1) {
		webgl.enableVertexAttribArray(p1);
	}
	
	public static final void glVertexAttribPointer(int p1, int p2, int p3, boolean p4, int p5, int p6) {
		webgl.vertexAttribPointer(p1, p2, p3, p4, p5, p6);
	}
	
	public static final BufferArrayGL glCreateVertexArray() {
		return new BufferArrayGL(webgl.createVertexArray());
	}
	
	public static final BufferGL glCreateBuffer() {
		return new BufferGL(webgl.createBuffer());
	}
	
	public static final void glBindVertexArray(BufferArrayGL p1) {
		webgl.bindVertexArray(p1 == null ? null : p1.obj);
	}
	
	public static final void glBindBuffer(int p1, BufferGL p2) {
		webgl.bindBuffer(p1, p2 == null ? null : p2.obj);
	}
	
	public static void glTexSubImage2D(int target, int level, int xoffset, int yoffset, int width, int height, int format, int type, IntBuffer pixels) {
		bytesUploaded += pixels.remaining() * 4;
		int length = pixels.remaining();
		Int32Array array  = Int32Array.create(bufferUpload.getBuffer());
		for(int i = 0; i < length; ++i) {
			array .set(i, pixels.get());
		}
		Uint8Array data = Uint8Array.create(bufferUpload.getBuffer(), 0, length*4);
		int target1 = 0;
		switch(target) {
		default:
		case GL_TEXTURE_2D:
			target1 = WebGL2RenderingContext.TEXTURE_2D;
			break;
		}
		webgl.texSubImage2D(target1, level, xoffset, yoffset, width, height, WebGL2RenderingContext.RGBA, WebGL2RenderingContext.UNSIGNED_BYTE, data);
	}
	
	public static void glTexSubImage2D(int target, int level, int xoffset, int yoffset, int width, int height, int format, int type, ByteBuffer pixels) {
		bytesUploaded += pixels.remaining() * 4;
		int length = pixels.remaining();
		Int32Array array  = Int32Array.create(bufferUpload.getBuffer());
		for(int i = 0; i < length; ++i) {
			array.set(i, pixels.get());
		}
		Uint8Array data = Uint8Array.create(bufferUpload.getBuffer(), 0, length*4);
		int target1 = 0;
		switch(target) {
		default:
		case GL_TEXTURE_2D:
			target1 = WebGL2RenderingContext.TEXTURE_2D;
			break;
		}
		webgl.texSubImage2D(target1, level, xoffset, yoffset, width, height, WebGL2RenderingContext.RGBA, WebGL2RenderingContext.UNSIGNED_BYTE, data);
	}
	
	public static final void glDeleteTextures(int n, IntBuffer textureBuf) {
		glDeleteTextures(textureBuf);
	}
	
	public static final void glDeleteTextures(int n, int texture) {
		glDeleteTextures(texture);
	}
	
	public static final void glDeleteTextures(int texture) {
		if(textures.containsKey(texture)) {
			TextureGL textureObj = textures.get(texture);
			webgl.deleteTexture(textureObj.obj);
			textures.remove(texture);
		}
	}
	
	public static final void glDeleteTextures(IntBuffer textureBuf) {
		while(textureBuf.hasRemaining()) {
			glDeleteTextures(textureBuf.get());
		}
	}
	
	public static final int glGenTextures() {
		textureIndex++;
		if(textureIndex >= 256) {
			//Reset texture index instead of clearing textures completely
			textureIndex = 1;
		}
		
		textures.put(textureIndex, new TextureGL(webgl.createTexture()));
		return textureIndex;
	}
	
	public static final void glGenTextures(IntBuffer buf) {
		for (int i = buf.position(); i < buf.limit(); i++) {
			buf.put(i, glGenTextures());
		}
	}
	
	public static final void glFogi(int pname, int param) {
		if (pname == GL_FOG_MODE) {
			switch (param) {
				default:
				case GL_LINEAR:
					fogMode = 1;
					break;
				case GL_EXP:
					fogMode = 2;
					break;
			}
		}
	}

	public static final void glFogf(int pname, float param) {
		switch (pname) {
			case GL_FOG_START:
				fogStart = param;
				break;
			case GL_FOG_END:
				fogEnd = param;
				break;
			case GL_FOG_DENSITY:
				fogDensity = param;
				break;
			default:
				break;
		}
	}

	public static final void glFog(int pname, FloatBuffer param) {
		if (pname == GL_FOG_COLOR) {
			fogColorR = param.get();
			fogColorG = param.get();
			fogColorB = param.get();
			fogColorA = param.get();
		}
	}
	
	private static int appendbufferindex = 0;
	private static Int32Array appendbuffer = Int32Array.create(ArrayBuffer.create(525000*4));

	public static final void glAppendLowLevelBuffer(Object arr) {
		Int32Array a = ((Int32Array)arr);
		if(appendbufferindex + a.getLength() < appendbuffer.getLength()) {
			appendbuffer.set(a, appendbufferindex);
			appendbufferindex += a.getLength();
		}
	}
	
	public static final Object glGetLowLevelBuffersAppended() {
		Int32Array ret = Int32Array.create(appendbuffer.getBuffer(), 0, appendbufferindex);
		appendbufferindex = 0;
		return ret;
	}
	
	public static final int glArrayByteLength(Object obj) {
		return ((Int32Array)obj).getByteLength();
	}
	
	public static final void glBufferSubData(int p1, int p2, Object p3) {
		webgl.bufferSubData(p1, p2, (Int32Array)p3);
	}
	
	public static final void glDeleteVertexArray(BufferArrayGL p1) {
		webgl.deleteVertexArray(p1.obj);
	}
	
	public static final void glDeleteBuffer(BufferGL p1) {
		webgl.deleteBuffer(p1.obj);
	}
	
	public static final void glGetInteger(int pname, int[] param) {
		if(pname == GL_VIEWPORT) {
			param[0] = viewportCache[0];
			param[1] = viewportCache[1];
			param[2] = viewportCache[2];
			param[3] = viewportCache[3];
		}
	}
	
	public static final void glGetInteger(int pname, IntBuffer param) {
		if(param.remaining() >= 4) {
			glGetInteger(pname, param.array());
		}
	}
	
	public static final void glViewport(int x, int y, int width, int height) {
		viewportCache[0] = x;
		viewportCache[1] = y;
		viewportCache[2] = width;
		viewportCache[3] = height;
		webgl.viewport(x, y, width, height);
	}
	
	public static final int glGetError() {
		int err = webgl.getError();
		if (err == WebGL2RenderingContext.CONTEXT_LOST_WEBGL)
			return GL_CONTEXT_LOST_WEBGL;
		return err;
	}
	
	public static final int glGetVertexes() {
		int ret = vertexDrawn;
		vertexDrawn = 0;
		return ret;
	}

	public static final int glGetTriangles() {
		int ret = triangleDrawn;
		triangleDrawn = 0;
		return ret;
	}
	
	public static final void glOptimize() {
		WebGLShader.optimize();
	}
	
	@JSBody(params = {"buf", "i", "i2"}, script = "return buf.subarray(i, i2);")
	private static native Float32Array subArray(Float32Array buf, int i, int i2);
	
	
	
	
	// ---- (unimplemented) ----
	//TODO: Implement later
	
	
	public static void glLightModelf(int pname, float param) {
	}
	
	public static void glLightModeli(int pname, int param) {
	}
	
	public static void glLightModelfv(int pname, FloatBuffer param) {
	}
	
	public static void glLightModeliv(int pname, IntBuffer param) {
	}
	
	public static void glLightModel(int pname, Buffer param) {
	}
	
	public static void glColorMaterial(int face, int mode) {
		  if (!lighting) return;

		  WebGLShader shader = WebGLShader.instance(getShaderMode());
		  shader.use();

		  switch (mode) {
		  case GL11.GL_AMBIENT:
			  if (face == GL11.GL_FRONT) {
				  shader.color(materialAmbientR, materialAmbientG, materialAmbientB, materialAmbientA);
		      } else if (face == GL11.GL_BACK) {
		    	  shader.color(materialBackAmbientR, materialBackAmbientG, materialBackAmbientB, materialBackAmbientA);
		      } else {
		    	  shader.color(materialAmbientR, materialAmbientG, materialAmbientB, materialAmbientA);
		    	  shader.color(materialBackAmbientR, materialBackAmbientG, materialBackAmbientB, materialBackAmbientA);
		      }
		      break;
		  case GL11.GL_DIFFUSE:
		      if (face == GL11.GL_FRONT) {
		    	  shader.color(materialDiffuseR, materialDiffuseG, materialDiffuseB, materialDiffuseA);
		      } else if (face == GL11.GL_BACK) {
		    	  shader.color(materialBackDiffuseR, materialBackDiffuseG, materialBackDiffuseB, materialBackDiffuseA);
		      } else {
		    	  shader.color(materialDiffuseR, materialDiffuseG, materialDiffuseB, materialDiffuseA);
		    	  shader.color(materialBackDiffuseR, materialBackDiffuseG, materialBackDiffuseB, materialBackDiffuseA);
		      }
		      break;
		  case GL11.GL_SPECULAR:
		      if (face == GL11.GL_FRONT) {
		    	  shader.color(materialSpecularR, materialSpecularG, materialSpecularB, materialSpecularA);
		      } else if (face == GL11.GL_BACK) {
		    	  shader.color(materialBackSpecularR, materialBackSpecularG, materialBackSpecularB, materialBackSpecularA);
		      } else {
		    	  shader.color(materialSpecularR, materialSpecularG, materialSpecularB, materialSpecularA);
		    	  shader.color(materialBackSpecularR, materialBackSpecularG, materialBackSpecularB, materialBackSpecularA);
		      }
		      break;
		  case GL11.GL_EMISSION:
		      if (face == GL11.GL_FRONT) {
		    	  shader.color(materialEmissionR, materialEmissionG, materialEmissionB, materialEmissionA);
		      } else if (face == GL11.GL_BACK) {
		    	  shader.color(materialBackEmissionR, materialBackEmissionG, materialBackEmissionB, materialBackEmissionA);
		      } else {
		    	  shader.color(materialEmissionR, materialEmissionG, materialEmissionB, materialEmissionA);
		    	  shader.color(materialBackEmissionR, materialBackEmissionG, materialBackEmissionB, materialBackEmissionA);
		      }
		      break;
		  case GL11.GL_AMBIENT_AND_DIFFUSE:
			  if (face == GL11.GL_FRONT) {
				  shader.color(materialAmbientR, materialAmbientG, materialAmbientB, materialAmbientA);
				  shader.color(materialDiffuseR, materialDiffuseG, materialDiffuseB, materialDiffuseA);
		      } else if (face == GL11.GL_BACK) {
		    	  shader.color(materialBackAmbientR, materialBackAmbientG, materialBackAmbientB, materialBackAmbientA);
		    	  shader.color(materialBackDiffuseR, materialBackDiffuseG, materialBackDiffuseB, materialBackDiffuseA);
		      } else {
		    	  shader.color(materialAmbientR, materialAmbientG, materialAmbientB, materialAmbientA);
		    	  shader.color(materialBackAmbientR, materialBackAmbientG, materialBackAmbientB, materialBackAmbientA);
		    	  shader.color(materialDiffuseR, materialDiffuseG, materialDiffuseB, materialDiffuseA);
		    	  shader.color(materialBackDiffuseR, materialBackDiffuseG, materialBackDiffuseB, materialBackDiffuseA);
		      }
			  break;
		  default:
			  break;
		  }
	}
	
	public static void glLightf(int light, int pname, float param) {
		if((light == GL_LIGHT0 || light == GL_LIGHT1) && pname == GL_POSITION) {
			copyModelToLightMatrix(param, param, param, param);
		}
	}
	
	public static void glLighti(int light, int pname, int param) {
		glLightf(light, pname, param);
	}
	
	public static void glLightfv(int light, int pname, FloatBuffer param) {
		float[] array = new float[param.remaining()];
		param.get(array);
		if((light == GL_LIGHT0 || light == GL_LIGHT1) && pname == GL_POSITION) {
			copyModelToLightMatrix(array[0], array[1], array[2], array[3]);
		}
	}
	
	public static void glLightiv(int light, int pname, IntBuffer param) {
		int[] array = new int[param.remaining()];
		param.get(array);
		if((light == GL_LIGHT0 || light == GL_LIGHT1) && pname == GL_POSITION) {
			copyModelToLightMatrix(array[0], array[1], array[2], array[3]);
		}
	}
	
	public static void glLight(int light, int pname, Buffer param) {
		if(param instanceof IntBuffer) {
			glLightiv(light, pname, (IntBuffer)param);
		} else if(param instanceof FloatBuffer) {
			glLightfv(light, pname, (FloatBuffer)param);
		} else {
			throw new IllegalArgumentException("glLight: Unsupported buffer type!");
		}
	}
	
	private static final void copyModelToLightMatrix(float par1, float par2, float par3, float par4) {
		lightPos0vec0.set(lightPos0vec);
		lightPos1vec0.set(lightPos1vec);
		lightPos0vec.set(par1, par2, -par3, par4);
		lightPos0vec.normalise();
		lightPos1vec.set(-par1, par2, par3, par4);
		lightPos1vec.normalise();
		Matrix4f.transform(matModelV[matModelPointer], lightPos0vec, lightPos0vec).normalise();
		Matrix4f.transform(matModelV[matModelPointer], lightPos1vec, lightPos1vec).normalise();
	}
	
	public static void glFlipLighting() {
		lightPos0vec.x = -lightPos0vec.x;
		lightPos1vec.x = -lightPos1vec.x;
		lightPos0vec.y = -lightPos0vec.y;
		lightPos1vec.y = -lightPos1vec.y;
		lightPos0vec.z = -lightPos0vec.z;
		lightPos1vec.z = -lightPos1vec.z;
	}
	
	public static void glRevertLighting() {
		lightPos0vec.set(lightPos0vec0);
		lightPos1vec.set(lightPos1vec0);
	}
	
	public static void glShadeModel(int shade) {
	}
	
	private static final class ImmediateModeData {
		private Float32Array floatBuffer;
		private int vertices = 0;
		private float u;
		private float v;
		private boolean texture = false;
		private int rawBufferIndex = 0;
		public static ImmediateModeData instance = new ImmediateModeData();
		private int mode = 7;

		public ImmediateModeData() {
			ArrayBuffer a = ArrayBuffer.create(525000 * 4);
			this.floatBuffer = Float32Array.create(a);
		}

		public final void end() {
			if(this.vertices > 0) {
				if(this.texture) {
					GL11.glEnableClientState(GL11.GL_TEXTURE_COORD_ARRAY);
				}

				GL11.glDrawArrays(mode, 0, this.vertices, Int32Array.create(floatBuffer.getBuffer(), 0, this.vertices * 7));
		         
				if(this.texture) {
					GL11.glDisableClientState(GL11.GL_TEXTURE_COORD_ARRAY);
				}
			}

			this.clear();
		}

		private void clear() {
			this.vertices = 0;
			this.rawBufferIndex = 0;
		}

		public final void begin(int mode) {
			this.clear();
			this.texture = false;
			this.mode = mode;
		}
		   
		public void setTextureUV(float par1, float par3) {
			this.texture = true;
			this.u = par1;
			this.v = par3;
		}

		public final void vertex(float var1, float var2, float var3) {
			++this.vertices;
			int bufferIndex = this.rawBufferIndex;
			Float32Array floatBuffer0 = floatBuffer;
				
			floatBuffer0.set(bufferIndex + 0, (float) (var1));
			floatBuffer0.set(bufferIndex + 1, (float) (var2));
			floatBuffer0.set(bufferIndex + 2, (float) (var3));
				
			if(this.texture) {
				floatBuffer0.set(bufferIndex + 3, this.u);
				floatBuffer0.set(bufferIndex + 4, this.v);
			}

			this.rawBufferIndex += 7;
		}

	}
	
	private static class MatrixMode {
		private int type = -1;
		
		private float angle;
		private float x;
		private float y;
		private float z;
		
		private MatrixMode(int type, float x, float y, float z) {
			this.type = type;
			this.x = x;
			this.y = y;
			this.z = z;
		}
		
		private MatrixMode(int type, float angle, float x, float y, float z) {
			this.type = type;
			this.x = x;
			this.y = y;
			this.z = z;
			this.angle = angle;
		}
	}
	
	private static class DisplayList {
		
		private final int id;
		private BufferArrayGL array;
		private BufferGL buffer;
		private int mode;
		private int length;
		private int drawMode = GL11.GL_QUADS;
		private Object currentBuffer = null;
		private int count = 0;
		private int first = 0;
		
		private List<MatrixMode> matrixMode = new ArrayList<MatrixMode>();
		
		private DisplayList(int id) {
			this.id = id;
			array = null;
			buffer = null;
			mode = -1;
			length = 0;
		}
	}
	
	static {
		webgl = WebGL.webgl;
		
		
		alphaValue = 0.1f;
		alpha = false;
		
		currentWebGLProgram = -1;
		
		//Uniform
		mat2 = Float32Array.create(4);
		mat3 = Float32Array.create(9);
		mat4 = Float32Array.create(16);
		
		textures = new HashMap<Integer, TextureGL>(256);
		textureIndex = 0;
		
		textureArray = false;
		colorArray = false;
		normalArray = false;
		
		compilingDisplayList = false;
		currentList = null;
		lists = new HashMap<Integer, DisplayList>();
		initLists = new HashMap<Integer, DisplayList>();
		quadsToTrianglesBuffer = null;
		currentArray = null;
		bytesUploaded = 0;
		vertexDrawn = 0;
		triangleDrawn = 0;
		
		fogColorR = 1.0f;
		fogColorG = 1.0f;
		fogColorB = 1.0f;
		fogColorA = 1.0f;
		fogMode = 1;
		fogEnabled = false;
		fogPremultiply = false;
		fogStart = 1.0f;
		fogEnd = 1.0f;
		fogDensity = 1.0f;
		
		texture2D = false;
		lighting = false;
		colorMaterial = false;
		
		normalX = 1.0f;
		normalY = 0.0f;
		normalZ = 0.0f;
		tex0X = 0;
		tex0Y = 0;
		
		colorR = 1.0f;
		colorG = 1.0f;
		colorB = 1.0f;
		colorA = 1.0f;
		
		matrixMode = GL_MODELVIEW;
		matModelV = new Matrix4f[32];
		matModelPointer = 0;
		matProjV = new Matrix4f[6];
		matProjPointer = 0;
		matTexV = new Matrix4f[16];
		matTexPointer = 0;
		
		for (int i = 0; i < matModelV.length; ++i) {
			matModelV[i] = new Matrix4f();
		}
		
		for (int i = 0; i < matProjV.length; ++i) {
			matProjV[i] = new Matrix4f();
		}
		
		for (int i = 0; i < matTexV.length; ++i) {
			matTexV[i] = new Matrix4f();
		}
		
		matrixVector = new Vector3f();
		
		lightPos1vec = new Vector4f();
		lightPos0vec = new Vector4f();
		lightPos0vec0 = new Vector4f();
		lightPos1vec0 = new Vector4f();
		
		vertexBuffer = webgl.createBuffer();
		texCoordBuffer = webgl.createBuffer();
		
		viewportCache = new int[4];
		
		materialAmbientR = 0.3f;
		materialAmbientG = 0.3f;
		materialAmbientB = 0.3f;
		materialAmbientA = 1.0f;
		
		materialDiffuseR = 0.8f;
		materialDiffuseG = 0.5f;
		materialDiffuseB = 0.3f;
		materialDiffuseA = 1.0f;
		
		materialSpecularR = 0.4f;
		materialSpecularG = 0.4f;
		materialSpecularB = 0.4f;
		materialSpecularA = 1.0f;
		
		materialEmissionR = 0.0f;
		materialEmissionG = 0.0f;
		materialEmissionB = 0.0f;
		materialEmissionA = 1.0f;

		materialBackAmbientR = 0.2f;
		materialBackAmbientG = 0.2f;
		materialBackAmbientB = 0.4f;
		materialBackAmbientA = 1.0f;
		
		materialBackDiffuseR = 0.6f;
		materialBackDiffuseG = 0.3f;
		materialBackDiffuseB = 0.5f;
		materialBackDiffuseA = 1.0f;
		
		materialBackSpecularR = 0.2f;
		materialBackSpecularG = 0.2f;
		materialBackSpecularB = 0.2f;
		materialBackSpecularA = 1.0f;
		
		materialBackEmissionR = 0.0f;
		materialBackEmissionG = 0.0f;
		materialBackEmissionB = 0.2f;
		materialBackEmissionA = 1.0f;
	}
	
	private static WebGLShader shaderWebGL = null;
	
}