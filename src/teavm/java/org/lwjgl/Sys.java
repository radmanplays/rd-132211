package org.lwjgl;

public class Sys {
	
	public static int getTimerResolution() {
		return 1000;
	}
	
	public static long getTime() {
		return System.currentTimeMillis() & 0x7FFFFFFFFFFFFFFFL;
	}
	
	public static String getVersion() {
		return "2.9.3";
	}
}
