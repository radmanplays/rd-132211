package com.mojang.rubydung.level;

import com.mojang.util.GLAllocation;
import org.lwjgl.BufferUtils;
import org.lwjgl.opengl.GL11;

import net.lax1dude.eaglercraft.internal.buffer.FloatBuffer;

public class Tesselator {
	private static final int MAX_VERTICES = 100000;
	private FloatBuffer vertexBuffer = GLAllocation.createFloatBuffer(300000);
	private FloatBuffer texCoordBuffer = GLAllocation.createFloatBuffer(200000);
	private FloatBuffer colorBuffer = GLAllocation.createFloatBuffer(300000);
	private int vertices = 0;
	private float u;
	private float v;
	private float r;
	private float g;
	private float b;
	private boolean hasColor = false;
	private boolean hasTexture = false;

	public void flush() {
		this.vertexBuffer.flip();
		this.texCoordBuffer.flip();
		this.colorBuffer.flip();

		this.clear();
	}

	private void clear() {
		this.vertices = 0;
		this.vertexBuffer.clear();
		this.texCoordBuffer.clear();
		this.colorBuffer.clear();
	}

	public void init() {
		this.clear();
		this.hasColor = false;
		this.hasTexture = false;
	}

	public void tex(float u, float v) {
		this.hasTexture = true;
		this.u = u;
		this.v = v;
	}

	public void color(float r, float g, float b) {
		this.hasColor = true;
		this.r = r;
		this.g = g;
		this.b = b;
	}

	public void vertex(float x, float y, float z) {
		this.vertexBuffer.put(this.vertices * 3 + 0, x).put(this.vertices * 3 + 1, y).put(this.vertices * 3 + 2, z);
		if(this.hasTexture) {
			this.texCoordBuffer.put(this.vertices * 2 + 0, this.u).put(this.vertices * 2 + 1, this.v);
		}

		if(this.hasColor) {
			this.colorBuffer.put(this.vertices * 3 + 0, this.r).put(this.vertices * 3 + 1, this.g).put(this.vertices * 3 + 2, this.b);
		}

		++this.vertices;
		if(this.vertices == 100000) {
			this.flush();
		}

	}
}
