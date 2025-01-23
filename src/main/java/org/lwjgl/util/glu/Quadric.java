package org.lwjgl.util.glu;

import static org.lwjgl.opengl.GL11.*;
import static org.lwjgl.util.glu.GLU.*;

public class Quadric {

	protected int drawStyle;
	protected int orientation;
	protected boolean textureFlag;
	protected int normals;

	public Quadric() {
		super();

		drawStyle = GLU_FILL;
		orientation = GLU_OUTSIDE;
		textureFlag = false;
		normals = GLU_SMOOTH;
	}

	protected void normal3f(float x, float y, float z) {
	   float mag;

	   mag = (float)Math.sqrt(x * x + y * y + z * z);
	   if (mag > 0.00001F) {
	      x /= mag;
	      y /= mag;
	      z /= mag;
	   }
	   glNormal3f(x, y, z);
	}

	public void setDrawStyle(int drawStyle) {
		this.drawStyle = drawStyle;
	}

	public void setNormals(int normals) {
		this.normals = normals;
	}

	public void setOrientation(int orientation) {
		this.orientation = orientation;
	}

	public void setTextureFlag(boolean textureFlag) {
		this.textureFlag = textureFlag;
	}

	public int getDrawStyle() {
		return drawStyle;
	}

	public int getNormals() {
		return normals;
	}

	public int getOrientation() {
		return orientation;
	}

	public boolean getTextureFlag() {
		return textureFlag;
	}

	protected void TXTR_COORD(float x, float y) {
		if (textureFlag) glTexCoord2f(x,y);
	}


	protected float sin(float r) {
		return (float)Math.sin(r);
	}

	protected float cos(float r) {
		return (float)Math.cos(r);
	}
}