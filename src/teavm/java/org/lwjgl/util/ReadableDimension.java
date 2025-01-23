package org.lwjgl.util;

public interface ReadableDimension {

	int getWidth();

	int getHeight();

	void getSize(WritableDimension dest);

}