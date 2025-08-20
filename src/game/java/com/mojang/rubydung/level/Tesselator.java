package com.mojang.rubydung.level;

import org.lwjgl.opengl.GL11;

public class Tesselator {
    private float u, v;
    private float r, g, b;
    private boolean hasColor = false;
    private boolean hasTexture = false;
    private boolean drawing = false;

    public void init() {
        if (drawing) {
            flush();
        }
        hasColor = false;
        hasTexture = false;
        drawing = true;

        GL11.glBegin(GL11.GL_QUADS);
    }

    public void tex(float u, float v) {
        this.u = u;
        this.v = v;
        this.hasTexture = true;
        GL11.glTexCoord2f(u, v);
    }

    public void color(float r, float g, float b) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.hasColor = true;
        GL11.glColor3f(r, g, b);
    }

    public void vertex(float x, float y, float z) {
        if (hasColor) {
            GL11.glColor3f(r, g, b);
        }

        if (hasTexture) {
            GL11.glTexCoord2f(u, v);
        }

        GL11.glVertex3f(x, y, z);

        hasColor = false;
        hasTexture = false;
    }

    public void flush() {
        if (!drawing) return;
        GL11.glEnd();
        drawing = false;
        hasColor = false;
        hasTexture = false;
    }
}
