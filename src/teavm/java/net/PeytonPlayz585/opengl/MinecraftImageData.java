package net.PeytonPlayz585.opengl;

import java.nio.IntBuffer;

public class MinecraftImageData {

    public final IntBuffer data;
    public final int w;
    public final int h;
    public final boolean alpha;
    private final int wh;

    public MinecraftImageData(int pw, int ph, boolean palpha) {
        this.w = pw;
        this.h = ph;
        this.alpha = palpha;
        this.data = IntBuffer.allocate(pw * ph);
        this.wh = pw * ph;
    }

    public MinecraftImageData(IntBuffer pdata, int pw, int ph, boolean palpha) {
        if (pdata.capacity() != pw * ph) {
            throw new IllegalArgumentException("buffer capacity does not equal image size");
        }
        w = pw;
        h = ph;
        alpha = palpha;
        wh = pw * ph;
        if (!alpha) {
            for (int i = 0; i < wh; ++i) {
                pdata.put(i, pdata.get(i) | 0xFF000000);
            }
            pdata.rewind();
        }
        data = pdata;
    }

    public MinecraftImageData getSubImage(int x, int y, int pw, int ph) {
        int start = y * w + x;
        IntBuffer subBuffer = data.slice();
        subBuffer.position(start);
        subBuffer.limit(start + pw * ph);
		int[] temp = new int[pw * ph];
        subBuffer.get(temp);
		IntBuffer newBuffer = IntBuffer.wrap(temp);
        return new MinecraftImageData(newBuffer, pw, ph, alpha);
    }

	public int[] data() {
        int[] array = new int[wh];
        data.rewind();
        data.get(array);
        return array;
    }
}