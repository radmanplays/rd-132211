package org.lwjgl.util;

public interface WritableRectangle extends WritablePoint, WritableDimension {

	void setBounds(int x, int y, int width, int height);

	void setBounds(ReadablePoint location, ReadableDimension size);

	void setBounds(ReadableRectangle src);
}