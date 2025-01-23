package org.lwjgl.util.glu;

import static org.lwjgl.opengl.GL11.*;
import static org.lwjgl.util.glu.GLU.*;

public class Cylinder extends Quadric {

	public Cylinder() {
		super();
	}

	public void draw(float baseRadius, float topRadius, float height, int slices, int stacks) {

		float da, r, dr, dz;
		float x, y, z, nz, nsign;
		int i, j;

		if (super.orientation == GLU_INSIDE) {
			nsign = -1.0f;
		} else {
			nsign = 1.0f;
		}

		da = 2.0f * PI / slices;
		dr = (topRadius - baseRadius) / stacks;
		dz = height / stacks;
		nz = (baseRadius - topRadius) / height;

		if (super.drawStyle == GLU_POINT) {
			glBegin(GL_POINTS);
			for (i = 0; i < slices; i++) {
				x = cos((i * da));
				y = sin((i * da));
				normal3f(x * nsign, y * nsign, nz * nsign);

				z = 0.0f;
				r = baseRadius;
				for (j = 0; j <= stacks; j++) {
					glVertex3f((x * r), (y * r), z);
					z += dz;
					r += dr;
				}
			}
			glEnd();
		} else if (super.drawStyle == GLU_LINE || super.drawStyle == GLU_SILHOUETTE) {
			if (super.drawStyle == GLU_LINE) {
				z = 0.0f;
				r = baseRadius;
				for (j = 0; j <= stacks; j++) {
					glBegin(GL_LINE_LOOP);
					for (i = 0; i < slices; i++) {
						x = cos((i * da));
						y = sin((i * da));
						normal3f(x * nsign, y * nsign, nz * nsign);
						glVertex3f((x * r), (y * r), z);
					}
					glEnd();
					z += dz;
					r += dr;
				}
			} else {
				if (baseRadius != 0.0) {
					glBegin(GL_LINE_LOOP);
					for (i = 0; i < slices; i++) {
						x = cos((i * da));
						y = sin((i * da));
						normal3f(x * nsign, y * nsign, nz * nsign);
						glVertex3f((x * baseRadius), (y * baseRadius), 0.0f);
					}
					glEnd();
					glBegin(GL_LINE_LOOP);
					for (i = 0; i < slices; i++) {
						x = cos((i * da));
						y = sin((i * da));
						normal3f(x * nsign, y * nsign, nz * nsign);
						glVertex3f((x * topRadius), (y * topRadius), height);
					}
					glEnd();
				}
			}
			glBegin(GL_LINES);
			for (i = 0; i < slices; i++) {
				x = cos((i * da));
				y = sin((i * da));
				normal3f(x * nsign, y * nsign, nz * nsign);
				glVertex3f((x * baseRadius), (y * baseRadius), 0.0f);
				glVertex3f((x * topRadius), (y * topRadius), (height));
			}
			glEnd();
		} else if (super.drawStyle == GLU_FILL) {
			float ds = 1.0f / slices;
			float dt = 1.0f / stacks;
			float t = 0.0f;
			z = 0.0f;
			r = baseRadius;
			for (j = 0; j < stacks; j++) {
				float s = 0.0f;
				glBegin(GL_QUAD_STRIP);
				for (i = 0; i <= slices; i++) {
					if (i == slices) {
						x = sin(0.0f);
						y = cos(0.0f);
					} else {
						x = sin((i * da));
						y = cos((i * da));
					}
					if (nsign == 1.0f) {
						normal3f((x * nsign), (y * nsign), (nz * nsign));
						TXTR_COORD(s, t);
						glVertex3f((x * r), (y * r), z);
						normal3f((x * nsign), (y * nsign), (nz * nsign));
						TXTR_COORD(s, t + dt);
						glVertex3f((x * (r + dr)), (y * (r + dr)), (z + dz));
					} else {
						normal3f(x * nsign, y * nsign, nz * nsign);
						TXTR_COORD(s, t);
						glVertex3f((x * r), (y * r), z);
						normal3f(x * nsign, y * nsign, nz * nsign);
						TXTR_COORD(s, t + dt);
						glVertex3f((x * (r + dr)), (y * (r + dr)), (z + dz));
					}
					s += ds;
				}
				glEnd();
				r += dr;
				t += dt;
				z += dz;
			}
		}
	}
}