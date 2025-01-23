package org.lwjgl.util;

public interface WritablePoint {
	void setLocation(int x, int y);
	void setLocation(ReadablePoint p);
	void setX(int x);
	void setY(int y);
}