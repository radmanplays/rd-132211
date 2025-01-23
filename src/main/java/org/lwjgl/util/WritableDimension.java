package org.lwjgl.util;

public interface WritableDimension {
	void setSize(int w, int h);
	void setSize(ReadableDimension d);

	void setHeight(int height);

	void setWidth(int width);
}