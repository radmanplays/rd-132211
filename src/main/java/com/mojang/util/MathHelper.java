package com.mojang.util;

public final class MathHelper {

	private static final int[] MULTIPLY_DE_BRUIJN_BIT_POSITION;
	private static float[] SIN_TABLE = new float[4096];

	public static final float sin(float var0) {
		return SIN_TABLE[(int) (var0 * 651.8986F) & 4095];
	}

	public static final float cos(float var0) {
		return SIN_TABLE[(int) ((var0 + ((float) Math.PI / 2F)) * 651.8986F) & 4095];
	}

	public static final float sqrt(float var0) {
		return (float) Math.sqrt((double) var0);
	}

	public static int smallestEncompassingPowerOfTwo(int value) {
		int i = value - 1;
		i = i | i >> 1;
		i = i | i >> 2;
		i = i | i >> 4;
		i = i | i >> 8;
		i = i | i >> 16;
		return i + 1;
	}

	private static boolean isPowerOfTwo(int value) {
		return value != 0 && (value & value - 1) == 0;
	}

	public static int log2DeBruijn(int value) {
		value = isPowerOfTwo(value) ? value : smallestEncompassingPowerOfTwo(value);
		return MULTIPLY_DE_BRUIJN_BIT_POSITION[(int) ((long) value * 125613361L >> 27) & 31];
	}

	public static int log2(int value) {
		return log2DeBruijn(value) - (isPowerOfTwo(value) ? 0 : 1);
	}

	public static int clamp(int num, int min, int max) {
		if (num < min) {
			return min;
		} else {
			return num > max ? max : num;
		}
	}

	public static int floor(float value) {
		int i = (int) value;
		return value < (float) i ? i - 1 : i;
	}

	public static int floor(double value) {
		int i = (int) value;
		return value < (double) i ? i - 1 : i;
	}

	public static int ceil(float value) {
		int i = (int) value;
		return value > (float) i ? i + 1 : i;
	}

	public static int ceil(double value) {
		int i = (int) value;
		return value > (double) i ? i + 1 : i;
	}

	static {
		for (int j = 0; j < 4096; ++j) {
			SIN_TABLE[j] = (float) Math.sin((double) (((float) j + 0.5F) / 4096.0F * ((float) Math.PI * 2F)));
		}

		for (int l = 0; l < 360; l += 90) {
			SIN_TABLE[(int) ((float) l * 11.377778F) & 4095] = (float) Math.sin((double) ((float) l * 0.017453292F));
		}

		MULTIPLY_DE_BRUIJN_BIT_POSITION = new int[] { 0, 1, 28, 2, 29, 14, 24, 3, 30, 22, 20, 15, 25, 17, 4, 8, 31, 27,
				13, 23, 21, 19, 16, 7, 26, 12, 18, 6, 11, 5, 10, 9 };
	}
}
