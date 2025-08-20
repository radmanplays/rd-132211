package com.mojang.rubydung;

import java.util.HashMap;

import com.mojang.util.GLAllocation;
import net.lax1dude.eaglercraft.EagRuntime;
import net.lax1dude.eaglercraft.opengl.ImageData;
import org.lwjgl.opengl.GL11;

import net.lax1dude.eaglercraft.internal.buffer.ByteBuffer;
import net.lax1dude.eaglercraft.internal.buffer.IntBuffer;

public class Textures {
	private static HashMap<String, Integer> idMap = new HashMap();
	private static int lastId = -9999999;

	public static int loadTexture(String resourceName, int mode) {
        if(idMap.containsKey(resourceName)) {
            return ((Integer)idMap.get(resourceName)).intValue();
        } else {
            IntBuffer e = GLAllocation.createIntBuffer(1);
            GL11.glGenTextures(e);
            int id = e.get(0);
            bind(id);
            int filter = (mode == GL11.GL_NEAREST || mode == GL11.GL_LINEAR) ? mode : GL11.GL_NEAREST;
            GL11.glTexParameteri(GL11.GL_TEXTURE_2D, GL11.GL_TEXTURE_MIN_FILTER, filter);
            GL11.glTexParameteri(GL11.GL_TEXTURE_2D, GL11.GL_TEXTURE_MAG_FILTER, filter);
            ImageData img = ImageData.loadImageFile(EagRuntime.getResourceStream(resourceName));
            int w = img.width;
            int h = img.height;
            ByteBuffer pixels = GLAllocation.createByteBuffer(w * h * 4);
            int[] rawPixels = new int[w * h];
            img.getRGB(0, 0, w, h, rawPixels, 0, w);

            for(int i = 0; i < rawPixels.length; ++i) {
                int a = rawPixels[i] >> 24 & 255;
                int r = rawPixels[i] >> 16 & 255;
                int g = rawPixels[i] >> 8 & 255;
                int b = rawPixels[i] & 255;
                rawPixels[i] = a << 24 | r << 16 | g << 8 | b;
            }

            pixels.asIntBuffer().put(rawPixels);
            GL11.glTexImage2D(GL11.GL_TEXTURE_2D, 0, GL11.GL_RGBA, w, h, 0, GL11.GL_RGBA, GL11.GL_UNSIGNED_BYTE, pixels);
            return id;
        }
    }

	public static void bind(int id) {
		if(id != lastId) {
			GL11.glBindTexture(GL11.GL_TEXTURE_2D, id);
			lastId = id;
		}

	}
}
