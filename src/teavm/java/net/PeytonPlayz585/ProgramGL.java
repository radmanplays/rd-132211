package main;

import org.teavm.jso.webgl.WebGLProgram;

public final class ProgramGL { 
	public final WebGLProgram obj; 
	public final int hashcode;
	private static int progId = 0;
	public ProgramGL(WebGLProgram obj) { 
		this.obj = obj; 
		this.hashcode = ++progId;
	} 
} 