package org.lwjgl.opengl;

import org.teavm.jso.dom.events.EventListener;
import org.teavm.jso.dom.html.HTMLCanvasElement;
import org.teavm.jso.dom.html.HTMLElement;

import main.WebGL;
import main.WebGL2RenderingContext;

import java.nio.ByteBuffer;
import java.nio.FloatBuffer;

import org.lwjgl.BufferUtils;
import org.lwjgl.LWJGLException;
import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.dom.events.Event;

public class Display {
	
	private static DisplayMode currentMode = new DisplayMode(0, 0);
	
	private static int width = 0;
	private static int height = 0;
	
	//Can NOT be null!
	private static String title = "Game";
	
	private static boolean fullscreen = false;
	private static int swapInterval = 0;
	
	private static final boolean windowCreated = true; //Always true
	private static boolean windowResized = false;
	private static boolean windowResizable = true;
	
	//(background colors)
	private static float r, g, b;
	
	private static JSObject fullscreenQuery = null;
	
	private static boolean isWindowActive = true;
	
	static EventListener<Event> resizeEvent = new EventListener<Event>() {
		@Override
		public void handleEvent(Event evt) {
			windowResized = true;
		}
	};
	static EventListener<Event> blurEvent = new EventListener<Event>() {
		@Override
		public void handleEvent(Event evt) {
			isWindowActive = false;
		}
	};
	static EventListener<Event> focusEvent = new EventListener<Event>() {
		@Override
		public void handleEvent(Event evt) {
			isWindowActive = true;
		}
	};
	
	static {
		fullscreenQuery = fullscreenMediaQuery();
		WebGL.window.addEventListener("resize", resizeEvent);
		WebGL.window.addEventListener("blue", blurEvent);
		WebGL.window.addEventListener("focus", focusEvent);
	}
	
	private Display() {
	}
	
	public static DisplayMode[] getAvailableDisplayModes() throws LWJGLException {
		DisplayMode[] filteredModes = new DisplayMode[1];
		filteredModes[0] = currentMode;
		return filteredModes;
	}
	
	public static DisplayMode getDesktopDisplayMode() {
		return currentMode;
	}
	
	public static DisplayMode getDisplayMode() {
		return currentMode;
	}
	
	public static void setDisplayMode(DisplayMode mode) throws LWJGLException {
		//Not supported
	}
	
	private static DisplayMode getEffectiveMode() {
		return currentMode;
	}
	
	private static int getWindowX() {
		if(!isFullscreen()) {
			return WebGL.window.getScreenX();
		} else {
			return 0;
		}
	}
	
	private static int getWindowY() {
		if(!isFullscreen()) {
			return WebGL.window.getScreenY();
		} else {
			return 0;
		}
	}
	
	private static void createWindow() throws LWJGLException {
		double ratio = WebGL.window.getDevicePixelRatio();
		width = (int)(WebGL.canvas.getClientWidth() * ratio);
		height = (int)(WebGL.canvas.getClientHeight() * ratio);
		setTitle(title);
		update();
	}
	
	public static void setDisplayConfiguration(float gamma, float brightness, float contrast) throws LWJGLException {
		if (brightness < -1.0f || brightness > 1.0f) {
			throw new IllegalArgumentException("Invalid brightness value");
		}
		if (contrast < 0.0f) {
			throw new IllegalArgumentException("Invalid contrast value");
		}
		//Assuming 256
		int rampSize = 256;
		FloatBuffer gammaRamp = BufferUtils.createFloatBuffer(rampSize);
		for ( int i = 0; i < rampSize; i++ ) {
			float intensity = (float)i / (rampSize - 1);
			float rampEntry = (float)java.lang.Math.pow(intensity, gamma);
			rampEntry += brightness;
			rampEntry = (rampEntry - 0.5f) * contrast + 0.5f;
			if (rampEntry > 1.0f) {
				rampEntry = 1.0f;
			} else if (rampEntry < 0.0f) {
				rampEntry = 0.0f;
			}
			gammaRamp.put(i, rampEntry);
		}
		
		//Will be implemented later
		
		//setGammaRamp(gammaRamp);
	}
	
	public static void sync(int fps) {
		Sync.sync(fps);
	}
	
	public static String getTitle() {
		return title;
	}
	
	public static HTMLCanvasElement getParent() {
		return WebGL.canvas;
	}

	public static void setParent(HTMLCanvasElement parent) throws LWJGLException {
		//No
	}
	
	public static void setFullscreen(boolean fullscreen) throws LWJGLException {
		if(fullscreen) {
			if(!isFullscreen()) {
				requestFullscreen(WebGL.parent);
			}
		} else {
			if(isFullscreen()) {
				exitFullscreen();
			}
		}
	}
	
	public static void setDisplayModeAndFullscreen(DisplayMode mode) throws LWJGLException {
		setFullscreen(true);
	}
	
	public static boolean isFullscreen() {
		return mediaQueryMatches(fullscreenQuery);
	}
	
	public static void setTitle(String newTitle) {
		if(newTitle == null) {
			throw new IllegalArgumentException("title cannot be null");
		}
		title = newTitle;
	}
	
	public static boolean isCloseRequested() {
		return false;
	}
	
	public static void swapBuffers() throws LWJGLException {
		GL11.glFlush();
		update();
		GL11.glOptimize();
	}
	
	public static boolean isVisible() {
		return jsIsVisible();
	}
	
	public static boolean isActive() {
		return isWindowActive;
	}
	
	public static void update() {
		update(true);
	}
	
	public static void update(boolean processMessages) {
		double r = WebGL.window.getDevicePixelRatio();
		int w = (int)(WebGL.canvas.getClientWidth() * r);
		int h = (int)(WebGL.canvas.getClientHeight() * r);
		if(width != w || height != h) {
			windowResized = true;
		}
		
		if(windowResizable && windowResized) {
			width = w;
			height = h;
			WebGL.canvas.setWidth(width);
			WebGL.canvas.setHeight(height);
			windowResized = false;
		}
		
		WebGL.webgl.bindFramebuffer(WebGL2RenderingContext.FRAMEBUFFER, null);
		WebGL.webgl.bindFramebuffer(WebGL2RenderingContext.READ_FRAMEBUFFER, WebGL.backBuffer.obj);
		WebGL.webgl.bindFramebuffer(WebGL2RenderingContext.DRAW_FRAMEBUFFER, null);
		WebGL.webgl.blitFramebuffer(0, 0, WebGL.backBufferWidth, WebGL.backBufferHeight, 0, 0, w, h, WebGL2RenderingContext.COLOR_BUFFER_BIT, WebGL2RenderingContext.NEAREST);
		WebGL.webgl.bindFramebuffer(WebGL2RenderingContext.FRAMEBUFFER, WebGL.backBuffer.obj);
		WebGL.resizeBackBuffer(width, height);
		
		WebGL.document.setTitle(title);
		
		try {
			Thread.sleep(1l);
		} catch (InterruptedException e) {
			;
		}
	}
	
	public static void releaseContext() throws LWJGLException {
		
	}
	
	public static boolean isCurrent() throws LWJGLException {
		return true;
	}
	
	public static void makeCurrent() throws LWJGLException {
		
	}
	
	public static void create() throws LWJGLException {
		createWindow();
	}
	
	public static void create(PixelFormat pixel_format) throws LWJGLException {
		createWindow();
	}
	
	public static void setInitialBackground(float red, float green, float blue) {
		r = red;
		g = green;
		b = blue;
	}
	
	public static void destroy() {
	}
	
	public static boolean isCreated() {
		return windowCreated;
	}
	
	public static void setSwapInterval(int value) {
		swapInterval = value;
	}
	
	public static void setVSyncEnabled(boolean sync) {
		setSwapInterval(sync ? 1 : 0);
	}
	
	public static void setLocation(int new_x, int new_y) {
		
	}
	
	public static String getVersion() {
		return "webgl 2.0";
	}
	
	public static int setIcon(ByteBuffer[] icons) {
		return 0;
	}
	
	public static void setResizable(boolean resizable) {
		windowResizable = resizable;
		update();
	}
	
	public static boolean isResizable() {
		return windowResizable;
	}
	
	public static boolean wasResized() {
		return windowResized;
	}
	
	public static int getX() {
		if (Display.isFullscreen()) {
			return 0;
		}

		return getWindowX();
	}
	
	public static int getY() {
		if (Display.isFullscreen()) {
			return 0;
		}

		return getWindowY();
	}
	
	public static int getWidth() {
		if (Display.isFullscreen()) {
			return (int)(WebGL.canvas.getClientWidth() * getPixelScaleFactor());
		}

		return width;
	}
	
	public static int getHeight() {
		if (Display.isFullscreen()) {
			return (int)(WebGL.canvas.getClientHeight() * getPixelScaleFactor());
		}

		return height;
	}
	
	public static void setWidth(int w) {
		w = (int)(w * getPixelScaleFactor());
		WebGL.canvas.setWidth(w);
		width = w;
	}
	
	public static void setHeight(int h) {
		h = (int)(h * getPixelScaleFactor());
		WebGL.canvas.setHeight(h);
		height = h;
	}
	
	public static float getPixelScaleFactor() {
		return (float) WebGL.window.getDevicePixelRatio();
	}
	
	@JSBody(params = {}, script = "return window.matchMedia('(display-mode: fullscreen)');")
	private static native JSObject fullscreenMediaQuery();

	@JSBody(params = { "mediaQuery" }, script = "return mediaQuery.matches;")
	private static native boolean mediaQueryMatches(JSObject mediaQuery);
	
	@JSBody(params = { "element" }, script = "element.requestFullscreen();")
	private	 static native void requestFullscreen(HTMLElement element);
	
	@JSBody(params = { }, script = "document.exitFullscreen();")
	private static native void exitFullscreen();
	
	@JSBody(script = "return window.document.visibilityState == \"visible\";")
	public static native boolean jsIsVisible();
}
