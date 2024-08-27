package org.lwjgl.input;

import net.PeytonPlayz585.opengl.LWJGLMain;

public class Keyboard {

	public static String getKeyName(int keyCode) {
		return LWJGLMain.getKeyName(keyCode);
	}

	public static boolean next() {
		return LWJGLMain.keysNext();
	}

	public static boolean getEventKeyState() {
		return LWJGLMain.getEventKeyState();
	}

	public static int getEventKey() {
		return LWJGLMain.getEventKey();
	}

	public static char getEventCharacter() {
		return LWJGLMain.getEventChar();
	}

	public static void enableRepeatEvents(boolean b) {
		LWJGLMain.enableRepeatEvents(b);
	}

	public static boolean isKeyDown(int i) {
		return LWJGLMain.isKeyDown(i);
	}
	
}
