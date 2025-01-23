package main;

public final class BufferArrayGL { 
	public final WebGLVertexArray obj; 
	public boolean isQuadBufferBound; 
	public BufferArrayGL(WebGLVertexArray obj) { 
		this.obj = obj; 
		this.isQuadBufferBound = false; 
	} 
}
