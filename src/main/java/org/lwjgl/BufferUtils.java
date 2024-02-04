package org.lwjgl;

import java.nio.*;

public class BufferUtils {
    public static FloatBuffer createFloatBuffer(int i1) {
        return createDirectFloatBuffer(i1);
    }

    public static IntBuffer createIntBuffer(int i1) {
        return createDirectIntBuffer(i1);
    }

    public static ByteBuffer createByteBuffer(int i1) {
        return createDirectByteBuffer(i1);
    }

    public static ByteBuffer createDirectByteBuffer(int par0) {
        return ByteBuffer.wrap(new byte[par0]).order(ByteOrder.nativeOrder());
    }

    public static IntBuffer createDirectIntBuffer(int par0) {
        return IntBuffer.wrap(new int[par0]);
    }

    public static FloatBuffer createDirectFloatBuffer(int par0) {
        return FloatBuffer.wrap(new float[par0]);
    }
}