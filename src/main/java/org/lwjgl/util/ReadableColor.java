package org.lwjgl.util;

import java.nio.ByteBuffer;

public interface ReadableColor {

	int getRed();

	int getGreen();

	int getBlue();

	int getAlpha();

	byte getRedByte();

	byte getGreenByte();

	byte getBlueByte();

	byte getAlphaByte();

	void writeRGBA(ByteBuffer dest);

	void writeRGB(ByteBuffer dest);

	void writeABGR(ByteBuffer dest);

	void writeBGR(ByteBuffer dest);

	void writeBGRA(ByteBuffer dest);

	void writeARGB(ByteBuffer dest);

	ReadableColor RED = new Color(255, 0, 0);
	ReadableColor ORANGE = new Color(255, 128, 0);
	ReadableColor YELLOW = new Color(255, 255, 0);
	ReadableColor GREEN = new Color(0, 255, 0);
	ReadableColor CYAN = new Color(0, 255, 255);
	ReadableColor BLUE = new Color(0, 0, 255);
	ReadableColor PURPLE = new Color(255, 0, 255);
	ReadableColor WHITE = new Color(255, 255, 255);
	ReadableColor BLACK = new Color(0, 0, 0);
	ReadableColor LTGREY = new Color(192, 192, 192);
	ReadableColor DKGREY = new Color(64, 64, 64);
	ReadableColor GREY = new Color(128, 128, 128);
}