package org.lwjgl.opengl;

public class Display {
	public static boolean isActive() {
		return LWJGLMain.isFocused();
	}

	public static void update() {
		LWJGLMain.updateDisplay();
	}

	public static int getWidth() {
		return LWJGLMain.getCanvasWidth();
	}
	
	public static int getHeight() {
		return LWJGLMain.getCanvasHeight();
	}
}
