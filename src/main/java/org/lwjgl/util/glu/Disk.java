package org.lwjgl.util.glu;

import static org.lwjgl.opengl.GL11.*;
import static org.lwjgl.util.glu.GLU.*;

public class Disk extends Quadric {

	public Disk() {
		super();
	}

	public void draw(float innerRadius, float outerRadius, int slices, int loops)
	{
	   float da, dr;

	   if (super.normals != GLU_NONE) {
	      if (super.orientation == GLU_OUTSIDE) {
		 glNormal3f(0.0f, 0.0f, +1.0f);
	      }
	      else {
		 glNormal3f(0.0f, 0.0f, -1.0f);
	      }
	   }

	   da = 2.0f * PI / slices;
	   dr = (outerRadius - innerRadius) /  loops;

	   switch (super.drawStyle) {
	   case GLU_FILL:
	      {
		 float dtc = 2.0f * outerRadius;
		 float sa, ca;
		 float r1 = innerRadius;
		 int l;
		 for (l = 0; l < loops; l++) {
		    float r2 = r1 + dr;
		    if (super.orientation == GLU_OUTSIDE) {
		       int s;
		       glBegin(GL_QUAD_STRIP);
		       for (s = 0; s <= slices; s++) {
			  float a;
			  if (s == slices)
			     a = 0.0f;
			  else
			     a = s * da;
			  sa = sin(a);
			  ca = cos(a);
			  TXTR_COORD(0.5f + sa * r2 / dtc, 0.5f + ca * r2 / dtc);
			  glVertex2f(r2 * sa, r2 * ca);
			  TXTR_COORD(0.5f + sa * r1 / dtc, 0.5f + ca * r1 / dtc);
			  glVertex2f(r1 * sa, r1 * ca);
		       }
		       glEnd();
		    }
		    else {
		       int s;
		       glBegin(GL_QUAD_STRIP);
		       for (s = slices; s >= 0; s--) {
			  float a;
			  if (s == slices)
			     a = 0.0f;
			  else
			     a = s * da;
			  sa = sin(a);
			  ca = cos(a);
			  TXTR_COORD(0.5f - sa * r2 / dtc, 0.5f + ca * r2 / dtc);
			  glVertex2f(r2 * sa, r2 * ca);
			  TXTR_COORD(0.5f - sa * r1 / dtc, 0.5f + ca * r1 / dtc);
			  glVertex2f(r1 * sa, r1 * ca);
		       }
		       glEnd();
		    }
		    r1 = r2;
		 }
		 break;
	      }
	   case GLU_LINE:
	      {
		 int l, s;
		 for (l = 0; l <= loops; l++) {
		    float r = innerRadius + l * dr;
		    glBegin(GL_LINE_LOOP);
		    for (s = 0; s < slices; s++) {
		       float a = s * da;
		       glVertex2f(r * sin(a), r * cos(a));
		    }
		    glEnd();
		 }
		 for (s = 0; s < slices; s++) {
		    float a = s * da;
		    float x = sin(a);
		    float y = cos(a);
		    glBegin(GL_LINE_STRIP);
		    for (l = 0; l <= loops; l++) {
		       float r = innerRadius + l * dr;
		       glVertex2f(r * x, r * y);
		    }
		    glEnd();
		 }
		 break;
	      }
	   case GLU_POINT:
	      {
		 int s;
		 glBegin(GL_POINTS);
		 for (s = 0; s < slices; s++) {
		    float a = s * da;
		    float x = sin(a);
		    float y = cos(a);
		    int l;
		    for (l = 0; l <= loops; l++) {
		       float r = innerRadius * l * dr;
		       glVertex2f(r * x, r * y);
		    }
		 }
		 glEnd();
		 break;
	      }
	   case GLU_SILHOUETTE:
	      {
		 if (innerRadius != 0.0) {
		    float a;
		    glBegin(GL_LINE_LOOP);
		    for (a = 0.0f; a < 2.0 * PI; a += da) {
		       float x = innerRadius * sin(a);
		       float y = innerRadius * cos(a);
		       glVertex2f(x, y);
		    }
		    glEnd();
		 }
		 {
		    float a;
		    glBegin(GL_LINE_LOOP);
		    for (a = 0; a < 2.0f * PI; a += da) {
		       float x = outerRadius * sin(a);
		       float y = outerRadius * cos(a);
		       glVertex2f(x, y);
		    }
		    glEnd();
		 }
		 break;
	      }
	   default:
	      return;
	   }
	}

}