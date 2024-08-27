package org.lwjgl.input;

import net.PeytonPlayz585.opengl.LWJGLMain;

public class Mouse {

	public static int getDX() {
		return LWJGLMain.mouseGetDX();
	}
	
	public static int getDY() {
		return LWJGLMain.mouseGetDY();
	}
	
	public static int getX() {
		return LWJGLMain.mouseGetX();
	}
	
	public static int getY() {
		return LWJGLMain.mouseGetY();
	}

	public static void setNativeCursor(boolean b) {
		LWJGLMain.mouseSetGrabbed(b);
	}

	public static void setCursorPosition(int x, int y) {
		LWJGLMain.mouseSetCursorPosition(x, y);
	}

	public static boolean next() {
		return LWJGLMain.mouseNext();
	}

	public static boolean getEventButtonState() {
		return LWJGLMain.mouseGetEventButtonState();
	}

	public static int getEventX() {
		return LWJGLMain.mouseGetEventX();
	}
	
	public static int getEventY() {
		return LWJGLMain.mouseGetEventY();
	}

	public static int getEventButton() {
		return LWJGLMain.mouseGetEventButton();
	}

	public static boolean isButtonDown(int i) {
		return LWJGLMain.mouseIsButtonDown(i);
	}

	public static int getEventDWheel() {
		return LWJGLMain.mouseGetEventDWheel();
	}
	
}
