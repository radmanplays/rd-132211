package main;

import org.lwjgl.LWJGLException;
import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.css.CSSStyleDeclaration;
import org.teavm.jso.dom.html.HTMLCanvasElement;
import org.teavm.jso.dom.html.HTMLDocument;
import org.teavm.jso.dom.html.HTMLElement;

public class WebGL {

    public static HTMLDocument document = null;
	public static HTMLElement parent = null;
	public static HTMLCanvasElement canvas = null;
	public static WebGL2RenderingContext webgl = null;
	public static FramebufferGL backBuffer = null;
	public static RenderbufferGL backBufferColor = null;
	public static RenderbufferGL backBufferDepth = null;
	public static Window window = null;
	
	private static int width = 0;
	private static int height = 0;
	
	public static void main(String args[]) throws LWJGLException{
		window = Window.current();
		document = window.getDocument();
		parent = document.getBody();
		
		String s = parent.getAttribute("style");
		parent.setAttribute("style", (s == null ? "" : s)+"overflow-x:hidden;overflow-y:hidden;");
		
		canvas = (HTMLCanvasElement)document.createElement("canvas");
		double ratio = window.getDevicePixelRatio();
		width = (int)(parent.getClientWidth() * ratio);
		height = (int)(parent.getClientHeight() * ratio);
		canvas.setWidth(width);
		canvas.setHeight(height);
		parent.appendChild(canvas);
		CSSStyleDeclaration canvasStyle = canvas.getStyle();
		canvasStyle.setProperty("width", "100%");
		canvasStyle.setProperty("height", "100%");
		canvasStyle.setProperty("image-rendering", "pixelated");
		webgl = (WebGL2RenderingContext) canvas.getContext("webgl2", WebGLConfig());
		if(webgl == null) {
			throw new LWJGLException("WebGL 2.0 is not supported in your browser :(");
		}
		setCurrentContext(webgl);
		setupBackBuffer();
		resizeBackBuffer(width, height);
		
		webgl.getExtension("EXT_texture_filter_anisotropic");
	}
	
	@JSBody(params = { }, script = "return {antialias: false, depth: true, powerPreference: \"high-performance\", desynchronized: true, preserveDrawingBuffer: false, premultipliedAlpha: false, alpha: false};")
	public static native JSObject WebGLConfig();
	
	public static final void setupBackBuffer() {
		backBuffer = createFramebuffer();
		bindFramebuffer(WebGL2RenderingContext.FRAMEBUFFER, null);
		backBufferColor = createRenderBuffer();
		bindRenderbuffer(backBufferColor);
		framebufferRenderbuffer(WebGL2RenderingContext.COLOR_ATTACHMENT0, backBufferColor);
		backBufferDepth = createRenderBuffer();
		bindRenderbuffer(backBufferDepth);
		framebufferRenderbuffer(WebGL2RenderingContext.DEPTH_ATTACHMENT, backBufferDepth);
	}
	
	public static int backBufferWidth = -1;
	public static int backBufferHeight = -1;
	public static final void resizeBackBuffer(int w, int h) {
		if(w != backBufferWidth || h != backBufferHeight) {
			bindRenderbuffer(backBufferColor);
			renderbufferStorage(WebGL2RenderingContext.RGBA8, w, h);
			bindRenderbuffer(backBufferDepth);
			renderbufferStorage(WebGL2RenderingContext.DEPTH_COMPONENT32F, w, h);
			backBufferWidth = w;
			backBufferHeight = h;
		}
	}
	
	private static final void bindFramebuffer(int p1, FramebufferGL p2) {
		webgl.bindFramebuffer(p1, p2 == null ? backBuffer.obj : p2.obj);
	}
	
	private static final FramebufferGL createFramebuffer() {
		return new FramebufferGL(webgl.createFramebuffer());
	}
	
	private static final RenderbufferGL createRenderBuffer() {
		return new RenderbufferGL(webgl.createRenderbuffer());
	}
	
	private static final void bindRenderbuffer(RenderbufferGL p1) {
		webgl.bindRenderbuffer(WebGL2RenderingContext.RENDERBUFFER, p1 == null ? null : p1.obj);
	}
	
	private static final void framebufferRenderbuffer(int p1, RenderbufferGL p2) {
		webgl.framebufferRenderbuffer(WebGL2RenderingContext.FRAMEBUFFER, p1, WebGL2RenderingContext.RENDERBUFFER, p2 == null ? null : p2.obj);
	}
	
	private static final void renderbufferStorage(int p1, int p2, int p3) {
		webgl.renderbufferStorage(WebGL2RenderingContext.RENDERBUFFER, p1, p2, p3);
	}
	
	@JSBody(params = { "obj" }, script = "window.currentContext = obj;")
	private static native int setCurrentContext(JSObject obj);
}
