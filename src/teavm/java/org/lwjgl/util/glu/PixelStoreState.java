package org.lwjgl.util.glu;

import static org.lwjgl.opengl.GL11.*;

class PixelStoreState extends Util {

	public int unpackRowLength;
	public int unpackAlignment;
	public int unpackSkipRows;
	public int unpackSkipPixels;
	public int packRowLength;
	public int packAlignment;
	public int packSkipRows;
	public int packSkipPixels;

	PixelStoreState() {
		super();
		load();
	}

	public void load() {
		unpackRowLength = glGetIntegerv(GL_UNPACK_ROW_LENGTH);
		unpackAlignment = glGetIntegerv(GL_UNPACK_ALIGNMENT);
		unpackSkipRows = glGetIntegerv(GL_UNPACK_SKIP_ROWS);
		unpackSkipPixels = glGetIntegerv(GL_UNPACK_SKIP_PIXELS);
		packRowLength = glGetIntegerv(GL_PACK_ROW_LENGTH);
		packAlignment = glGetIntegerv(GL_PACK_ALIGNMENT);
		packSkipRows = glGetIntegerv(GL_PACK_SKIP_ROWS);
		packSkipPixels = glGetIntegerv(GL_PACK_SKIP_PIXELS);
	}

	public void save() {
		glPixelStorei(GL_UNPACK_ROW_LENGTH, unpackRowLength);
		glPixelStorei(GL_UNPACK_ALIGNMENT, unpackAlignment);
		glPixelStorei(GL_UNPACK_SKIP_ROWS, unpackSkipRows);
		glPixelStorei(GL_UNPACK_SKIP_PIXELS, unpackSkipPixels);
		glPixelStorei(GL_PACK_ROW_LENGTH, packRowLength);
		glPixelStorei(GL_PACK_ALIGNMENT, packAlignment);
		glPixelStorei(GL_PACK_SKIP_ROWS, packSkipRows);
		glPixelStorei(GL_PACK_SKIP_PIXELS, packSkipPixels);
	}

}