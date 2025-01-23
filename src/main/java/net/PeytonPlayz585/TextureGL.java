package main;

import org.teavm.jso.webgl.WebGLTexture;

public final class TextureGL { 
	public final WebGLTexture obj;
	public int w = -1;
	public int h = -1;
	public boolean nearest = true;
	public boolean anisotropic = false;
	public TextureGL(WebGLTexture obj) { 
		this.obj = obj; 
	} 
} 