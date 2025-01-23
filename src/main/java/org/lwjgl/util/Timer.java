package org.lwjgl.util;

import org.lwjgl.Sys;

public class Timer {

	private static long resolution = Sys.getTimerResolution();

	private static final int QUERY_INTERVAL = 50;
	private static int queryCount;

	private static long currentTime;

	private long startTime;

	private long lastTime;

	private boolean paused;

	static {
		tick();
	}

	public Timer() {
		reset();
		resume();
	}

	public float getTime() {
		if (!paused) {
			lastTime = currentTime - startTime;
		}

		return (float) ((double) lastTime / (double) resolution);
	}
	public boolean isPaused() {
		return paused;
	}

	public void pause() {
		paused = true;
	}
	
	public void reset() {
		set(0.0f);
	}

	public void resume() {
		paused = false;
		startTime = currentTime - lastTime;
	}

	public void set(float newTime) {
		long newTimeInTicks = (long) ((double) newTime * (double) resolution);
		startTime = currentTime - newTimeInTicks;
		lastTime = newTimeInTicks;
	}

	public static void tick() {
		currentTime = Sys.getTime();

		queryCount ++;
		if (queryCount > QUERY_INTERVAL) {
			queryCount = 0;
			resolution = Sys.getTimerResolution();
		}
	}

	public String toString() {
		return "Timer[Time=" + getTime() + ", Paused=" + paused + "]";
	}
}