package org.lwjgl.util.glu;

import static org.lwjgl.opengl.GL11.*;
import static org.lwjgl.util.glu.GLU.*;

public class PartialDisk extends Quadric {

	private static final int CACHE_SIZE = 240;

	public PartialDisk() {
		super();
	}

	public void draw(
		float innerRadius,
		float outerRadius,
		int slices,
		int loops,
		float startAngle,
		float sweepAngle) {

		int i, j;
		float[] sinCache = new float[CACHE_SIZE];
		float[] cosCache = new float[CACHE_SIZE];
		float angle;
		float sintemp, costemp;
		float deltaRadius;
		float radiusLow, radiusHigh;
		float texLow = 0, texHigh = 0;
		float angleOffset;
		int slices2;
		int finish;

		if (slices >= CACHE_SIZE)
			slices = CACHE_SIZE - 1;
		if (slices < 2
			|| loops < 1
			|| outerRadius <= 0.0f
			|| innerRadius < 0.0f
			|| innerRadius > outerRadius) {
			System.err.println("PartialDisk: GLU_INVALID_VALUE");
			return;
		}

		if (sweepAngle < -360.0f)
			sweepAngle = 360.0f;
		if (sweepAngle > 360.0f)
			sweepAngle = 360.0f;
		if (sweepAngle < 0) {
			startAngle += sweepAngle;
			sweepAngle = -sweepAngle;
		}

		if (sweepAngle == 360.0f) {
			slices2 = slices;
		} else {
			slices2 = slices + 1;
		}

		deltaRadius = outerRadius - innerRadius;

		angleOffset = startAngle / 180.0f * PI;
		for (i = 0; i <= slices; i++) {
			angle = angleOffset + ((PI * sweepAngle) / 180.0f) * i / slices;
			sinCache[i] = sin(angle);
			cosCache[i] = cos(angle);
		}

		if (sweepAngle == 360.0f) {
			sinCache[slices] = sinCache[0];
			cosCache[slices] = cosCache[0];
		}

		switch (super.normals) {
			case GLU_FLAT :
			case GLU_SMOOTH :
				if (super.orientation == GLU_OUTSIDE) {
					glNormal3f(0.0f, 0.0f, 1.0f);
				} else {
					glNormal3f(0.0f, 0.0f, -1.0f);
				}
				break;
			default :
			case GLU_NONE :
				break;
		}

		switch (super.drawStyle) {
			case GLU_FILL :
				if (innerRadius == .0f) {
					finish = loops - 1;
					glBegin(GL_TRIANGLE_FAN);
					if (super.textureFlag) {
						glTexCoord2f(0.5f, 0.5f);
					}
					glVertex3f(0.0f, 0.0f, 0.0f);
					radiusLow = outerRadius - deltaRadius * ((float) (loops - 1) / loops);
					if (super.textureFlag) {
						texLow = radiusLow / outerRadius / 2;
					}

					if (super.orientation == GLU_OUTSIDE) {
						for (i = slices; i >= 0; i--) {
							if (super.textureFlag) {
								glTexCoord2f(
									texLow * sinCache[i] + 0.5f,
									texLow * cosCache[i] + 0.5f);
							}
							glVertex3f(radiusLow * sinCache[i], radiusLow * cosCache[i], 0.0f);
						}
					} else {
						for (i = 0; i <= slices; i++) {
							if (super.textureFlag) {
								glTexCoord2f(
									texLow * sinCache[i] + 0.5f,
									texLow * cosCache[i] + 0.5f);
							}
							glVertex3f(radiusLow * sinCache[i], radiusLow * cosCache[i], 0.0f);
						}
					}
					glEnd();
				} else {
					finish = loops;
				}
				for (j = 0; j < finish; j++) {
					radiusLow = outerRadius - deltaRadius * ((float) j / loops);
					radiusHigh = outerRadius - deltaRadius * ((float) (j + 1) / loops);
					if (super.textureFlag) {
						texLow = radiusLow / outerRadius / 2;
						texHigh = radiusHigh / outerRadius / 2;
					}

					glBegin(GL_QUAD_STRIP);
					for (i = 0; i <= slices; i++) {
						if (super.orientation == GLU_OUTSIDE) {
							if (super.textureFlag) {
								glTexCoord2f(
									texLow * sinCache[i] + 0.5f,
									texLow * cosCache[i] + 0.5f);
							}
							glVertex3f(radiusLow * sinCache[i], radiusLow * cosCache[i], 0.0f);

							if (super.textureFlag) {
								glTexCoord2f(
									texHigh * sinCache[i] + 0.5f,
									texHigh * cosCache[i] + 0.5f);
							}
							glVertex3f(
								radiusHigh * sinCache[i],
								radiusHigh * cosCache[i],
								0.0f);
						} else {
							if (super.textureFlag) {
								glTexCoord2f(
									texHigh * sinCache[i] + 0.5f,
									texHigh * cosCache[i] + 0.5f);
							}
							glVertex3f(
								radiusHigh * sinCache[i],
								radiusHigh * cosCache[i],
								0.0f);

							if (super.textureFlag) {
								glTexCoord2f(
									texLow * sinCache[i] + 0.5f,
									texLow * cosCache[i] + 0.5f);
							}
							glVertex3f(radiusLow * sinCache[i], radiusLow * cosCache[i], 0.0f);
						}
					}
					glEnd();
				}
				break;
			case GLU_POINT :
				glBegin(GL_POINTS);
				for (i = 0; i < slices2; i++) {
					sintemp = sinCache[i];
					costemp = cosCache[i];
					for (j = 0; j <= loops; j++) {
						radiusLow = outerRadius - deltaRadius * ((float) j / loops);

						if (super.textureFlag) {
							texLow = radiusLow / outerRadius / 2;

							glTexCoord2f(
								texLow * sinCache[i] + 0.5f,
								texLow * cosCache[i] + 0.5f);
						}
						glVertex3f(radiusLow * sintemp, radiusLow * costemp, 0.0f);
					}
				}
				glEnd();
				break;
			case GLU_LINE :
				if (innerRadius == outerRadius) {
					glBegin(GL_LINE_STRIP);

					for (i = 0; i <= slices; i++) {
						if (super.textureFlag) {
							glTexCoord2f(sinCache[i] / 2 + 0.5f, cosCache[i] / 2 + 0.5f);
						}
						glVertex3f(innerRadius * sinCache[i], innerRadius * cosCache[i], 0.0f);
					}
					glEnd();
					break;
				}
				for (j = 0; j <= loops; j++) {
					radiusLow = outerRadius - deltaRadius * ((float) j / loops);
					if (super.textureFlag) {
						texLow = radiusLow / outerRadius / 2;
					}

					glBegin(GL_LINE_STRIP);
					for (i = 0; i <= slices; i++) {
						if (super.textureFlag) {
							glTexCoord2f(
								texLow * sinCache[i] + 0.5f,
								texLow * cosCache[i] + 0.5f);
						}
						glVertex3f(radiusLow * sinCache[i], radiusLow * cosCache[i], 0.0f);
					}
					glEnd();
				}
				for (i = 0; i < slices2; i++) {
					sintemp = sinCache[i];
					costemp = cosCache[i];
					glBegin(GL_LINE_STRIP);
					for (j = 0; j <= loops; j++) {
						radiusLow = outerRadius - deltaRadius * ((float) j / loops);
						if (super.textureFlag) {
							texLow = radiusLow / outerRadius / 2;
						}

						if (super.textureFlag) {
							glTexCoord2f(
								texLow * sinCache[i] + 0.5f,
								texLow * cosCache[i] + 0.5f);
						}
						glVertex3f(radiusLow * sintemp, radiusLow * costemp, 0.0f);
					}
					glEnd();
				}
				break;
			case GLU_SILHOUETTE :
				if (sweepAngle < 360.0f) {
					for (i = 0; i <= slices; i += slices) {
						sintemp = sinCache[i];
						costemp = cosCache[i];
						glBegin(GL_LINE_STRIP);
						for (j = 0; j <= loops; j++) {
							radiusLow = outerRadius - deltaRadius * ((float) j / loops);

							if (super.textureFlag) {
								texLow = radiusLow / outerRadius / 2;
								glTexCoord2f(
									texLow * sinCache[i] + 0.5f,
									texLow * cosCache[i] + 0.5f);
							}
							glVertex3f(radiusLow * sintemp, radiusLow * costemp, 0.0f);
						}
						glEnd();
					}
				}
				for (j = 0; j <= loops; j += loops) {
					radiusLow = outerRadius - deltaRadius * ((float) j / loops);
					if (super.textureFlag) {
						texLow = radiusLow / outerRadius / 2;
					}

					glBegin(GL_LINE_STRIP);
					for (i = 0; i <= slices; i++) {
						if (super.textureFlag) {
							glTexCoord2f(
								texLow * sinCache[i] + 0.5f,
								texLow * cosCache[i] + 0.5f);
						}
						glVertex3f(radiusLow * sinCache[i], radiusLow * cosCache[i], 0.0f);
					}
					glEnd();
					if (innerRadius == outerRadius)
						break;
				}
				break;
			default :
				break;
		}
	}
}