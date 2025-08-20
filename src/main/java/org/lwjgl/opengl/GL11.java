package org.lwjgl.opengl;

import net.lax1dude.eaglercraft.opengl.EaglercraftGPU;
import net.lax1dude.eaglercraft.opengl.GlStateManager;
import net.lax1dude.eaglercraft.opengl.RealOpenGLEnums;
import net.lax1dude.eaglercraft.opengl.Tessellator;
import net.lax1dude.eaglercraft.opengl.WorldRenderer;
import net.lax1dude.eaglercraft.vertex.DefaultVertexFormats;

import net.lax1dude.eaglercraft.internal.buffer.FloatBuffer;
import net.lax1dude.eaglercraft.internal.buffer.IntBuffer;

public class GL11 extends EaglercraftGPU {

	public static final int GL_TEXTURE_2D = RealOpenGLEnums.GL_TEXTURE_2D;
    private static final Tessellator tessellator = Tessellator.getInstance();
    private static final WorldRenderer renderer = tessellator.getWorldRenderer();
    
    private static boolean hasColor = false;
    private static boolean hasTexture = false;
    private static float r, g, b, a;
    private static float u, v;

	public static void glEnable(int p1) {
		switch (p1) {
		case GL_DEPTH_TEST:
			EaglercraftGPU.enableDepth();
			break;
		case GL_CULL_FACE:
			EaglercraftGPU.enableCull();
			break;
		case GL_BLEND:
			EaglercraftGPU.enableBlend();
			break;
		case GL_RESCALE_NORMAL:
			break;
		case GL_TEXTURE_2D:
			EaglercraftGPU.enableTexture2D();
			break;
		case GL_LIGHTING:
			EaglercraftGPU.enableLighting();
			break;
		case GL_ALPHA_TEST:
			EaglercraftGPU.enableAlpha();
			break;
		case GL_FOG:
			EaglercraftGPU.enableFog();
			break;
		// case GL_COLOR_MATERIAL:
		// EaglercraftGPU.enableColorMaterial();
		// break;
		case GL_TEXTURE_GEN_S:
		case GL_TEXTURE_GEN_T:
		case GL_TEXTURE_GEN_R:
		case GL_TEXTURE_GEN_Q:
			EaglercraftGPU.enableTexGen();
			break;
		case GL_POLYGON_OFFSET_FILL:
			EaglercraftGPU.enablePolygonOffset();
			break;
		default:
			break;
		}
	}

	public static void glDisable(int p1) {
		switch (p1) {
		case GL_DEPTH_TEST:
			EaglercraftGPU.disableDepth();
			break;
		case GL_CULL_FACE:
			EaglercraftGPU.disableCull();
			break;
		case GL_BLEND:
			EaglercraftGPU.disableBlend();
			break;
		case GL_RESCALE_NORMAL:
			break;
		case GL_TEXTURE_2D:
			EaglercraftGPU.disableTexture2D();
			break;
		case GL_LIGHTING:
			EaglercraftGPU.disableLighting();
			break;
		case GL_ALPHA_TEST:
			EaglercraftGPU.disableAlpha();
			break;
		case GL_FOG:
			EaglercraftGPU.disableFog();
			break;
		// case GL_COLOR_MATERIAL:
		// EaglercraftGPU.disableColorMaterial();
		// break;
		case GL_TEXTURE_GEN_S:
		case GL_TEXTURE_GEN_T:
		case GL_TEXTURE_GEN_R:
		case GL_TEXTURE_GEN_Q:
			EaglercraftGPU.disableTexGen();
			break;
		case GL_POLYGON_OFFSET_FILL:
			EaglercraftGPU.disablePolygonOffset();
			break;
		default:
			break;
		}
	}

	public static void glShadeModel(int i) {
		EaglercraftGPU.shadeModel(i);
	}

	public static void glClearDepth(float f) {
		EaglercraftGPU.clearDepth(f);
	}

	public static void glClearDepth(double d) {
		EaglercraftGPU.clearDepth((float) d);
	}

	public static void glDepthFunc(int f) {
		EaglercraftGPU.depthFunc(f);
	}

	public static void glAlphaFunc(int i, float f) {
		EaglercraftGPU.alphaFunc(i, f);
	}

	public static void glCullFace(int i) {
		EaglercraftGPU.cullFace(i);
	}

	public static void glMatrixMode(int i) {
		EaglercraftGPU.matrixMode(i);
	}

	public static void glLoadIdentity() {
		EaglercraftGPU.loadIdentity();
	}

	public static void glViewport(int i, int j, int width, int height) {
		EaglercraftGPU.viewport(i, j, width, height);
	}

	public static void glColorMask(boolean b, boolean c, boolean d, boolean e) {
		EaglercraftGPU.colorMask(b, c, d, e);
	}

	public static void glClearColor(float fogRed, float fogBlue, float fogGreen, float f) {
		EaglercraftGPU.clearColor(fogRed, fogBlue, fogGreen, f);
	}

	public static void glClear(int i) {
		EaglercraftGPU.clear(i);
	}

	public static void glTranslatef(float f, float g, float h) {
		EaglercraftGPU.translate(f, g, h);
	}

	public static void glRotatef(float f, float g, float h, float i) {
		EaglercraftGPU.rotate(f, g, h, i);
	}

	public static void glBindTexture(int i, int var110) {
		if (i != GL_TEXTURE_2D) {
			throw new RuntimeException("Only 2D texture types are supported!");
		}
		EaglercraftGPU.bindTexture(var110);
	}

	public static void glBlendFunc(int i, int j) {
		EaglercraftGPU.blendFunc(i, j);
	}

	public static void glPushMatrix() {
		EaglercraftGPU.pushMatrix();
	}

	public static void glPopMatrix() {
		EaglercraftGPU.popMatrix();
	}

	public static void glScalef(float f, float var35, float var352) {
		EaglercraftGPU.scale(f, var35, var352);
	}

	public static void glDepthMask(boolean b) {
		EaglercraftGPU.depthMask(b);
	}


    public static void glColor4f(float red, float green, float blue, float alpha) {
        r = red;
        g = green;
        b = blue;
        a = alpha;
        hasColor = true;
    }

    public static void glColor3f(float red, float green, float blue) {
        glColor4f(red, green, blue, 1.0f);
    }

    public static void glTexCoord2f(float tu, float tv) {
        u = tu;
        v = tv;
        hasTexture = true;
    }

    public static void glVertex3f(float x, float y, float z) {
        if (hasColor) {
            renderer.color(r, g, b, a);
        }
        if (hasTexture) {
            renderer.tex(u, v);
        }
        renderer.pos(x, y, z);
        renderer.endVertex();
    }
    
	public static void glFogf(int pname, float param) {
		switch (pname) {
			case GL_FOG_DENSITY:
				GlStateManager.setFogDensity(param);
				break;
			case GL_FOG_START:
				GlStateManager.setFogStart(param);
				break;
			case GL_FOG_END:
				GlStateManager.setFogEnd(param);
				break;
			default:
				break;
		}
	}

	public static void glFogi(int pname, int param) {
		if (pname == GL_FOG_MODE) {
			GlStateManager.setFog(param);
		} else {
			glFogf(pname, (float) param);
		}
	}
    

    public static void glVertex2f(float x, float y) {
        glVertex3f(x, y, 0.0f);
    }

    public static void glBegin(int mode) {
        renderer.begin(mode, DefaultVertexFormats.POSITION_TEX_COLOR);
        hasColor = false;
        hasTexture = false;
    }

    public static void glEnd() {
        tessellator.draw();
        hasColor = false;
        hasTexture = false;
    }

	public static void glCallLists(IntBuffer p1) {
		while (p1.hasRemaining()) {
			EaglercraftGPU.glCallList(p1.get());
		}
	}

	public static void glOrtho(double d, double var3, double var2, double e, double f, double g) {
		EaglercraftGPU.ortho(d, var3, var2, e, f, g);
	}

	public static void glGenTextures(IntBuffer idBuffer) {
		for (int i = idBuffer.position(); i < idBuffer.limit(); i++) {
			idBuffer.put(i, EaglercraftGPU.generateTexture());
		}
	}

	public static void glGetFloat(int glModelviewMatrix, FloatBuffer modelviewBuff) {
		EaglercraftGPU.getFloat(glModelviewMatrix, modelviewBuff);
	}

	public static void glColorMaterial(int i, int j) {
	}
	
	public static void glFog(int pname, FloatBuffer params) {
	    EaglercraftGPU.glFog(pname, params);
	}
	public static int glGetError() {
	    return EaglercraftGPU.glGetError();
	}
}
