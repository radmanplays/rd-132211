package org.lwjgl.util.glu;

import static org.lwjgl.opengl.GL11.*;
import static org.lwjgl.util.glu.GLU.*;

public class Sphere extends Quadric {

	public Sphere() {
		super();
	}

	public void draw(float radius, int slices, int stacks) {
		float rho, drho, theta, dtheta;
		float x, y, z;
		float s, t, ds, dt;
		int i, j, imin, imax;
		boolean normals;
		float nsign;

		normals = super.normals != GLU_NONE;

		if (super.orientation == GLU_INSIDE) {
			nsign = -1.0f;
		} else {
			nsign = 1.0f;
		}

		drho = PI / stacks;
		dtheta = 2.0f * PI / slices;

		if (super.drawStyle == GLU_FILL) {
			if (!super.textureFlag) {
				glBegin(GL_TRIANGLE_FAN);
				glNormal3f(0.0f, 0.0f, 1.0f);
				glVertex3f(0.0f, 0.0f, nsign * radius);
				for (j = 0; j <= slices; j++) {
					theta = (j == slices) ? 0.0f : j * dtheta;
					x = -sin(theta) * sin(drho);
					y = cos(theta) * sin(drho);
					z = nsign * cos(drho);
					if (normals) {
						glNormal3f(x * nsign, y * nsign, z * nsign);
					}
					glVertex3f(x * radius, y * radius, z * radius);
				}
				glEnd();
			}

			ds = 1.0f / slices;
			dt = 1.0f / stacks;
			t = 1.0f;
			if (super.textureFlag) {
				imin = 0;
				imax = stacks;
			} else {
				imin = 1;
				imax = stacks - 1;
			}

			for (i = imin; i < imax; i++) {
				rho = i * drho;
				glBegin(GL_QUAD_STRIP);
				s = 0.0f;
				for (j = 0; j <= slices; j++) {
					theta = (j == slices) ? 0.0f : j * dtheta;
					x = -sin(theta) * sin(rho);
					y = cos(theta) * sin(rho);
					z = nsign * cos(rho);
					if (normals) {
						glNormal3f(x * nsign, y * nsign, z * nsign);
					}
					TXTR_COORD(s, t);
					glVertex3f(x * radius, y * radius, z * radius);
					x = -sin(theta) * sin(rho + drho);
					y = cos(theta) * sin(rho + drho);
					z = nsign * cos(rho + drho);
					if (normals) {
						glNormal3f(x * nsign, y * nsign, z * nsign);
					}
					TXTR_COORD(s, t - dt);
					s += ds;
					glVertex3f(x * radius, y * radius, z * radius);
				}
				glEnd();
				t -= dt;
			}

			if (!super.textureFlag) {
				glBegin(GL_TRIANGLE_FAN);
				glNormal3f(0.0f, 0.0f, -1.0f);
				glVertex3f(0.0f, 0.0f, -radius * nsign);
				rho = PI - drho;
				s = 1.0f;
				for (j = slices; j >= 0; j--) {
					theta = (j == slices) ? 0.0f : j * dtheta;
					x = -sin(theta) * sin(rho);
					y = cos(theta) * sin(rho);
					z = nsign * cos(rho);
					if (normals)
						glNormal3f(x * nsign, y * nsign, z * nsign);
					s -= ds;
					glVertex3f(x * radius, y * radius, z * radius);
				}
				glEnd();
			}
		} else if (
			super.drawStyle == GLU_LINE
				|| super.drawStyle == GLU_SILHOUETTE) {
			for (i = 1;
				i < stacks;
				i++) {
				rho = i * drho;
				glBegin(GL_LINE_LOOP);
				for (j = 0; j < slices; j++) {
					theta = j * dtheta;
					x = cos(theta) * sin(rho);
					y = sin(theta) * sin(rho);
					z = cos(rho);
					if (normals)
						glNormal3f(x * nsign, y * nsign, z * nsign);
					glVertex3f(x * radius, y * radius, z * radius);
				}
				glEnd();
			}
			for (j = 0; j < slices; j++) {
				theta = j * dtheta;
				glBegin(GL_LINE_STRIP);
				for (i = 0; i <= stacks; i++) {
					rho = i * drho;
					x = cos(theta) * sin(rho);
					y = sin(theta) * sin(rho);
					z = cos(rho);
					if (normals)
						glNormal3f(x * nsign, y * nsign, z * nsign);
					glVertex3f(x * radius, y * radius, z * radius);
				}
				glEnd();
			}
		} else if (super.drawStyle == GLU_POINT) {
			glBegin(GL_POINTS);
			if (normals)
				glNormal3f(0.0f, 0.0f, nsign);
			glVertex3f(0.0f, 0.0f, radius);
			if (normals)
				glNormal3f(0.0f, 0.0f, -nsign);
			glVertex3f(0.0f, 0.0f, -radius);

			for (i = 1; i < stacks - 1; i++) {
				rho = i * drho;
				for (j = 0; j < slices; j++) {
					theta = j * dtheta;
					x = cos(theta) * sin(rho);
					y = sin(theta) * sin(rho);
					z = cos(rho);
					if (normals)
						glNormal3f(x * nsign, y * nsign, z * nsign);
					glVertex3f(x * radius, y * radius, z * radius);
				}
			}
			glEnd();
		}
	}

}