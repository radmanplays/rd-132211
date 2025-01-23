package org.lwjgl.util.glu;

import java.nio.ByteBuffer;

import org.lwjgl.BufferUtils;

import static org.lwjgl.opengl.GL11.*;
import static org.lwjgl.util.glu.GLU.*;

public class MipMap extends Util {

	public static int gluBuild2DMipmaps(final int target,
	                                    final int components, final int width, final int height,
	                                    final int format, final int type, final ByteBuffer data) {
		if ( width < 1 || height < 1 ) return GLU_INVALID_VALUE;

		final int bpp = bytesPerPixel(format, type);
		if ( bpp == 0 )
			return GLU_INVALID_ENUM;

		final int maxSize = glGetIntegerv(GL_MAX_TEXTURE_SIZE);

		int w = nearestPower(width);
		if ( w > maxSize )
			w = maxSize;

		int h = nearestPower(height);
		if ( h > maxSize )
			h = maxSize;

		PixelStoreState pss = new PixelStoreState();

		glPixelStorei(GL_PACK_ROW_LENGTH, 0);
		glPixelStorei(GL_PACK_ALIGNMENT, 1);
		glPixelStorei(GL_PACK_SKIP_ROWS, 0);
		glPixelStorei(GL_PACK_SKIP_PIXELS, 0);

		ByteBuffer image;
		int retVal = 0;
		boolean done = false;

		if ( w != width || h != height ) {
			image = BufferUtils.createByteBuffer((w + 4) * h * bpp);
			int error = gluScaleImage(format, width, height, type, data, w, h, type, image);
			if ( error != 0 ) {
				retVal = error;
				done = true;
			}

			glPixelStorei(GL_UNPACK_ROW_LENGTH, 0);
			glPixelStorei(GL_UNPACK_ALIGNMENT, 1);
			glPixelStorei(GL_UNPACK_SKIP_ROWS, 0);
			glPixelStorei(GL_UNPACK_SKIP_PIXELS, 0);
		} else {
			image = data;
		}

		ByteBuffer bufferA = null;
		ByteBuffer bufferB = null;

		int level = 0;
		while ( !done ) {
			if (image != data) {
				glPixelStorei(GL_UNPACK_ROW_LENGTH, 0);
				glPixelStorei(GL_UNPACK_ALIGNMENT, 1);
				glPixelStorei(GL_UNPACK_SKIP_ROWS, 0);
				glPixelStorei(GL_UNPACK_SKIP_PIXELS, 0);
			}

			glTexImage2D(target, level, components, w, h, 0, format, type, image);

			if ( w == 1 && h == 1 )
				break;

			final int newW = (w < 2) ? 1 : w >> 1;
			final int newH = (h < 2) ? 1 : h >> 1;

			final ByteBuffer newImage;

			if ( bufferA == null )
				newImage = (bufferA = BufferUtils.createByteBuffer((newW + 4) * newH * bpp));
			else if ( bufferB == null )
				newImage = (bufferB = BufferUtils.createByteBuffer((newW + 4) * newH * bpp));
			else
				newImage = bufferB;

			int error = gluScaleImage(format, w, h, type, image, newW, newH, type, newImage);
			if ( error != 0 ) {
				retVal = error;
				done = true;
			}

			image = newImage;
			if ( bufferB != null )
				bufferB = bufferA;

			w = newW;
			h = newH;
			level++;
		}

		pss.save();

		return retVal;
	}

	public static int gluScaleImage(int format,
	                                int widthIn, int heightIn, int typein, ByteBuffer dataIn,
	                                int widthOut, int heightOut, int typeOut, ByteBuffer dataOut) {

		final int components = compPerPix(format);
		if ( components == -1 )
			return GLU_INVALID_ENUM;

		int i, j, k;
		float[] tempIn, tempOut;
		float sx, sy;
		int sizein, sizeout;
		int rowstride, rowlen;

		tempIn = new float[widthIn * heightIn * components];
		tempOut = new float[widthOut * heightOut * components];

		switch ( typein ) {
			case GL_UNSIGNED_BYTE:
				sizein = 1;
				break;
			case GL_FLOAT:
				sizein = 4;
				break;
			default:
				return GL_INVALID_ENUM;
		}

		switch ( typeOut ) {
			case GL_UNSIGNED_BYTE:
				sizeout = 1;
				break;
			case GL_FLOAT:
				sizeout = 4;
				break;
			default:
				return GL_INVALID_ENUM;
		}

		PixelStoreState pss = new PixelStoreState();

		if ( pss.unpackRowLength > 0 )
			rowlen = pss.unpackRowLength;
		else
			rowlen = widthIn;

		if ( sizein >= pss.unpackAlignment )
			rowstride = components * rowlen;
		else
			rowstride = pss.unpackAlignment / sizein * ceil(components * rowlen * sizein, pss.unpackAlignment);

		switch ( typein ) {
			case GL_UNSIGNED_BYTE:
				k = 0;
				dataIn.rewind();
				for ( i = 0; i < heightIn; i++ ) {
					int ubptr = i * rowstride + pss.unpackSkipRows * rowstride + pss.unpackSkipPixels * components;
					for ( j = 0; j < widthIn * components; j++ ) {
						tempIn[k++] = dataIn.get(ubptr++) & 0xff;
					}
				}
				break;
			case GL_FLOAT:
				k = 0;
				dataIn.rewind();
				for ( i = 0; i < heightIn; i++ )
				{
					int fptr = 4 * (i * rowstride + pss.unpackSkipRows * rowstride + pss.unpackSkipPixels * components);
					for ( j = 0; j < widthIn * components; j++ )
					{
						tempIn[k++] = dataIn.getFloat(fptr);
						fptr += 4;
					}
				}
				break;
			default:
				return GLU_INVALID_ENUM;
		}

		sx = (float)widthIn / (float)widthOut;
		sy = (float)heightIn / (float)heightOut;

		float[] c = new float[components];
		int src, dst;

		for ( int iy = 0; iy < heightOut; iy++ ) {
			for ( int ix = 0; ix < widthOut; ix++ ) {
				int x0 = (int)(ix * sx);
				int x1 = (int)((ix + 1) * sx);
				int y0 = (int)(iy * sy);
				int y1 = (int)((iy + 1) * sy);

				int readPix = 0;

				for ( int ic = 0; ic < components; ic++ ) {
					c[ic] = 0;
				}

				for ( int ix0 = x0; ix0 < x1; ix0++ ) {
					for ( int iy0 = y0; iy0 < y1; iy0++ ) {

						src = (iy0 * widthIn + ix0) * components;

						for ( int ic = 0; ic < components; ic++ ) {
							c[ic] += tempIn[src + ic];
						}

						readPix++;
					}
				}

				dst = (iy * widthOut + ix) * components;

				if ( readPix == 0 ) {
					src = (y0 * widthIn + x0) * components;
					for ( int ic = 0; ic < components; ic++ ) {
						tempOut[dst++] = tempIn[src + ic];
					}
				} else {
					for ( k = 0; k < components; k++ ) {
						tempOut[dst++] = c[k] / readPix;
					}
				}
			}
		}


		if ( pss.packRowLength > 0 )
			rowlen = pss.packRowLength;
		else
			rowlen = widthOut;

		if ( sizeout >= pss.packAlignment )
			rowstride = components * rowlen;
		else
			rowstride = pss.packAlignment / sizeout * ceil(components * rowlen * sizeout, pss.packAlignment);

		switch ( typeOut ) {
			case GL_UNSIGNED_BYTE:
				k = 0;
				for ( i = 0; i < heightOut; i++ ) {
					int ubptr = i * rowstride + pss.packSkipRows * rowstride + pss.packSkipPixels * components;

					for ( j = 0; j < widthOut * components; j++ ) {
						dataOut.put(ubptr++, (byte)tempOut[k++]);
					}
				}
				break;
			case GL_FLOAT:
				k = 0;
				for ( i = 0; i < heightOut; i++ ) {
					int fptr = 4 * (i * rowstride + pss.unpackSkipRows * rowstride + pss.unpackSkipPixels * components);

					for ( j = 0; j < widthOut * components; j++ ) {
						dataOut.putFloat(fptr, tempOut[k++]);
						fptr += 4;
					}
				}
				break;
			default:
				return GLU_INVALID_ENUM;
		}

		return 0;
	}
}