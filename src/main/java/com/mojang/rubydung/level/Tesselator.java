package com.mojang.rubydung.level;

import org.teavm.jso.typedarrays.Float32Array;
import org.teavm.jso.webgl.WebGLRenderingContext;
import org.teavm.jso.webgl.WebGLBuffer;

public class Tesselator {
	private static final int MAX_VERTICES = 100000;

	private final WebGLRenderingContext gl;

	private float[] vertexData = new float[MAX_VERTICES * 3];
	private float[] texCoordData = new float[MAX_VERTICES * 2];
	private float[] colorData = new float[MAX_VERTICES * 3];

	private int vertices = 0;

	private float u;
	private float v;
	private float r;
	private float g;
	private float b;

	private boolean hasColor = false;
	private boolean hasTexture = false;

	private WebGLBuffer vertexBuffer;
	private WebGLBuffer texCoordBuffer;
	private WebGLBuffer colorBuffer;

	public Tesselator(WebGLRenderingContext gl) {
		this.gl = gl;

		// Create WebGL buffers
		vertexBuffer = gl.createBuffer();
		texCoordBuffer = gl.createBuffer();
		colorBuffer = gl.createBuffer();
	}

	public void flush() {
		if (vertices == 0) return;

		// Upload vertex data
		gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, convertToFloat32Array(vertexData, vertices * 3), WebGLRenderingContext.STREAM_DRAW);

		gl.vertexAttribPointer(0, 3, WebGLRenderingContext.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(0);

		if (hasTexture) {
			// Upload texture coordinate data
			gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, texCoordBuffer);
			gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, convertToFloat32Array(texCoordData, vertices * 2), WebGLRenderingContext.STREAM_DRAW);

			gl.vertexAttribPointer(1, 2, WebGLRenderingContext.FLOAT, false, 0, 0);
			gl.enableVertexAttribArray(1);
		}

		if (hasColor) {
			// Upload color data
			gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, colorBuffer);
			gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, convertToFloat32Array(colorData, vertices * 3), WebGLRenderingContext.STREAM_DRAW);

			gl.vertexAttribPointer(2, 3, WebGLRenderingContext.FLOAT, false, 0, 0);
			gl.enableVertexAttribArray(2);
		}

		// Draw vertices
		gl.drawArrays(WebGLRenderingContext.TRIANGLES, 0, vertices);

		// Disable attributes
		gl.disableVertexAttribArray(0);
		if (hasTexture) gl.disableVertexAttribArray(1);
		if (hasColor) gl.disableVertexAttribArray(2);

		this.clear();
	}

	public Float32Array getVertexData() {
		return convertToFloat32Array(vertexData, vertices * 3);
	}

	public int getVertexCount() {
		return vertices;
	}


	private void clear() {
		vertices = 0;
		vertexData = new float[MAX_VERTICES * 3];
		texCoordData = new float[MAX_VERTICES * 2];
		colorData = new float[MAX_VERTICES * 3];
	}

	public void init() {
		this.clear();
		hasColor = false;
		hasTexture = false;
	}

	public void tex(float u, float v) {
		hasTexture = true;
		this.u = u;
		this.v = v;
	}

	public void color(float r, float g, float b) {
		hasColor = true;
		this.r = r;
		this.g = g;
		this.b = b;
	}

	public void vertex(float x, float y, float z) {
		int vertexIndex = vertices * 3;
		vertexData[vertexIndex] = x;
		vertexData[vertexIndex + 1] = y;
		vertexData[vertexIndex + 2] = z;

		if (hasTexture) {
			int texIndex = vertices * 2;
			texCoordData[texIndex] = u;
			texCoordData[texIndex + 1] = v;
		}

		if (hasColor) {
			int colorIndex = vertices * 3;
			colorData[colorIndex] = r;
			colorData[colorIndex + 1] = g;
			colorData[colorIndex + 2] = b;
		}

		vertices++;

		if (vertices == MAX_VERTICES) {
			flush();
		}
	}

	/**
	 * Converts a Java float[] array to a Float32Array for WebGL usage.
	 */
	private Float32Array convertToFloat32Array(float[] data, int length) {
		Float32Array array = Float32Array.create(length);
		for (int i = 0; i < length; i++) {
			array.set(i, data[i]);
		}
		return array;
	}
}
