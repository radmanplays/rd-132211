package org.lwjgl.util;

import java.io.Serializable;

public final class Point implements ReadablePoint, WritablePoint, Serializable {

	static final long serialVersionUID = 1L;

	private int x, y;

	public Point() {
		super();
	}

	public Point(int x, int y) {
		setLocation(x, y);
	}

	public Point(ReadablePoint p) {
		setLocation(p);
	}

	public void setLocation(int x, int y) {
		this.x = x;
		this.y = y;
	}

	public void setLocation(ReadablePoint p) {
		this.x = p.getX();
		this.y = p.getY();
	}
	
	public void setX(int x) {
		this.x = x;
	}
	
	public void setY(int y) {
		this.y = y;
	}

	public void translate(int dx, int dy) {
		this.x += dx;
		this.y += dy;
	}

	public void translate(ReadablePoint p) {
		this.x += p.getX();
		this.y += p.getY();
	}

	public void untranslate(ReadablePoint p) {
		this.x -= p.getX();
		this.y -= p.getY();
	}

	public boolean equals(Object obj) {
		if (obj instanceof Point) {
			Point pt = (Point) obj;
			return (x == pt.x) && (y == pt.y);
		}
		return super.equals(obj);
	}

	public String toString() {
		return getClass().getName() + "[x=" + x + ",y=" + y + "]";
	}

	public int hashCode() {
		int sum = x + y;
		return sum * (sum + 1) / 2 + x;
	}
	
	public int getX() {
		return x;
	}
	
	public int getY() {
		return y;
	}

	public void getLocation(WritablePoint dest) {
		dest.setLocation(x, y);
	}
	
}