package org.lwjgl.opengl;

import org.teavm.jso.dom.html.HTMLCanvasElement;

import net.PeytonPlayz585.opengl.LWJGLMain;

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
