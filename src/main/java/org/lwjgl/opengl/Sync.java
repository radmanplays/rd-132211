package org.lwjgl.opengl;

import org.lwjgl.Sys;

public class Sync {
	
	private static final long NANOS_IN_SECOND = 1000L * 1000L * 1000L;

	private static long nextFrame = 0;
	
	private static boolean initialised = false;
	
	private static RunningAvg sleepDurations = new RunningAvg(10);
	private static RunningAvg yieldDurations = new RunningAvg(10);
	
	public static void sync(int fps) {
		if (fps <= 0) return;
		if (!initialised) initialise();
		
		try {
			for (long t0 = getTime(), t1; (nextFrame - t0) > sleepDurations.avg(); t0 = t1) {
				Thread.sleep(1);
				sleepDurations.add((t1 = getTime()) - t0);
			}
	
			sleepDurations.dampenForLowResTicker();
	
			for (long t0 = getTime(), t1; (nextFrame - t0) > yieldDurations.avg(); t0 = t1) {
				Thread.yield();
				yieldDurations.add((t1 = getTime()) - t0);
			}
		} catch (InterruptedException e) {
			
		}
		
		nextFrame = Math.max(nextFrame + NANOS_IN_SECOND / fps, getTime());
	}
	
	private static void initialise() {
		initialised = true;
		
		sleepDurations.init(1000 * 1000);
		yieldDurations.init((int) (-(getTime() - getTime()) * 1.333));
		
		nextFrame = getTime();
	}
	
	private static long getTime() {
		return (Sys.getTime() * NANOS_IN_SECOND) / Sys.getTimerResolution();
	}
	
	private static class RunningAvg {
		private final long[] slots;
		private int offset;
		
		private static final long DAMPEN_THRESHOLD = 10 * 1000L * 1000L; // 10ms
		private static final float DAMPEN_FACTOR = 0.9f; // don't change: 0.9f is exactly right!

		public RunningAvg(int slotCount) {
			this.slots = new long[slotCount];
			this.offset = 0;
		}

		public void init(long value) {
			while (this.offset < this.slots.length) {
				this.slots[this.offset++] = value;
			}
		}

		public void add(long value) {
			this.slots[this.offset++ % this.slots.length] = value;
			this.offset %= this.slots.length;
		}

		public long avg() {
			long sum = 0;
			for (int i = 0; i < this.slots.length; i++) {
				sum += this.slots[i];
			}
			return sum / this.slots.length;
		}
		
		public void dampenForLowResTicker() {
			if (this.avg() > DAMPEN_THRESHOLD) {
				for (int i = 0; i < this.slots.length; i++) {
					this.slots[i] *= DAMPEN_FACTOR;
				}
			}
		}
	}
}
