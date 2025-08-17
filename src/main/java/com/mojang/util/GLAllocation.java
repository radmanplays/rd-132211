package com.mojang.util;

import net.lax1dude.eaglercraft.EagRuntime;
import net.lax1dude.eaglercraft.internal.buffer.ByteBuffer;
import net.lax1dude.eaglercraft.internal.buffer.FloatBuffer;
import net.lax1dude.eaglercraft.internal.buffer.IntBuffer;

public class GLAllocation {

	/**
	 * Creates and returns a direct byte buffer with the specified capacity. Applies
	 * native ordering to speed up access.
	 */
	public static synchronized ByteBuffer createDirectByteBuffer(int capacity) {
		return EagRuntime.allocateByteBuffer(capacity);
	}

	/**
	 * Creates and returns a direct int buffer with the specified capacity. Applies
	 * native ordering to speed up access.
	 */
	public static IntBuffer createDirectIntBuffer(int capacity) {
		return EagRuntime.allocateIntBuffer(capacity);
	}

	/**
	 * Creates and returns a direct float buffer with the specified capacity.
	 * Applies native ordering to speed up access.
	 */
	public static FloatBuffer createDirectFloatBuffer(int capacity) {
		return EagRuntime.allocateFloatBuffer(capacity);
	}

    public static FloatBuffer createFloatBuffer(int i) {
		return EagRuntime.allocateFloatBuffer(i);
    }

	public static IntBuffer createIntBuffer(int i) {
		return EagRuntime.allocateIntBuffer(i);
	}

	public static ByteBuffer createByteBuffer(int i) {
		return EagRuntime.allocateByteBuffer(i);
	}
}