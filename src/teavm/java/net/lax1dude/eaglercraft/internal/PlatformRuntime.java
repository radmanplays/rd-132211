package net.lax1dude.eaglercraft.internal;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Consumer;

import net.lax1dude.eaglercraft.EagRuntime;
import net.lax1dude.eaglercraft.EaglercraftUUID;
import net.lax1dude.eaglercraft.EaglercraftVersion;
import net.lax1dude.eaglercraft.Filesystem;
import net.lax1dude.eaglercraft.KeyboardConstants;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.teavm.interop.Async;
import org.teavm.interop.AsyncCallback;
import org.teavm.jso.JSBody;
import org.teavm.jso.JSExceptions;
import org.teavm.jso.JSObject;
import org.teavm.jso.JSProperty;
import org.teavm.jso.browser.Window;
import org.teavm.jso.core.JSString;
import org.teavm.jso.dom.css.CSSStyleDeclaration;
import org.teavm.jso.dom.events.Event;
import org.teavm.jso.dom.events.EventListener;
import org.teavm.jso.dom.events.MessageEvent;
import org.teavm.jso.dom.html.HTMLCanvasElement;
import org.teavm.jso.dom.html.HTMLDocument;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.xml.Element;
import org.teavm.jso.dom.xml.Node;
import org.teavm.jso.dom.xml.NodeList;
import org.teavm.jso.typedarrays.ArrayBuffer;
import org.teavm.jso.webgl.WebGLFramebuffer;
import org.teavm.platform.Platform;
import org.teavm.platform.PlatformRunnable;

import com.jcraft.jzlib.Deflater;
import com.jcraft.jzlib.DeflaterOutputStream;
import com.jcraft.jzlib.GZIPInputStream;
import com.jcraft.jzlib.GZIPOutputStream;
import com.jcraft.jzlib.Inflater;
import com.jcraft.jzlib.InflaterInputStream;

import net.lax1dude.eaglercraft.internal.buffer.ByteBuffer;
import net.lax1dude.eaglercraft.internal.buffer.EaglerArrayBufferAllocator;
import net.lax1dude.eaglercraft.internal.buffer.FloatBuffer;
import net.lax1dude.eaglercraft.internal.buffer.IntBuffer;
import net.lax1dude.eaglercraft.internal.teavm.ES6ShimStatus;
import net.lax1dude.eaglercraft.internal.teavm.EarlyLoadScreen;
import net.lax1dude.eaglercraft.internal.teavm.EnumES6ShimStatus;
import net.lax1dude.eaglercraft.internal.teavm.EnumES6Shims;
import net.lax1dude.eaglercraft.internal.teavm.ImmediateContinue;
import net.lax1dude.eaglercraft.internal.teavm.MessageChannel;
import net.lax1dude.eaglercraft.internal.teavm.TeaVMBlobURLManager;
import net.lax1dude.eaglercraft.internal.teavm.ClientMain;
import net.lax1dude.eaglercraft.internal.teavm.EPKDownloadHelper;
import net.lax1dude.eaglercraft.internal.teavm.TeaVMClientConfigAdapter;
import net.lax1dude.eaglercraft.internal.teavm.TeaVMDataURLManager;
import net.lax1dude.eaglercraft.internal.teavm.TeaVMFetchJS;
import net.lax1dude.eaglercraft.internal.teavm.TeaVMRuntimeDeobfuscator;
import net.lax1dude.eaglercraft.internal.teavm.TeaVMUtils;
import net.lax1dude.eaglercraft.internal.teavm.VisualViewport;
import net.lax1dude.eaglercraft.internal.teavm.WebGL2RenderingContext;
import net.lax1dude.eaglercraft.internal.teavm.WebGLBackBuffer;
import net.lax1dude.eaglercraft.internal.vfs2.VFile2;
import net.lax1dude.eaglercraft.opengl.EaglercraftGPU;
import net.lax1dude.eaglercraft.opengl.RealOpenGLEnums;

/**
 * Copyright (c) 2022-2024 lax1dude. All Rights Reserved.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 * 
 */
public class PlatformRuntime {
	
	static final Logger logger = LogManager.getLogger("BrowserRuntime");

	public static Window win = null;
	public static HTMLDocument doc = null;
	public static HTMLElement root = null;
	public static HTMLElement parent = null;
	public static HTMLCanvasElement canvas = null;
	public static WebGL2RenderingContext webgl = null;
	public static boolean webglExperimental = false;
	
	private static String windowMessagePostOrigin = null;
	private static EventListener<MessageEvent> windowMessageListener = null;
	
	static WebGLFramebuffer mainFramebuffer = null;

	static boolean useDelayOnSwap = false;
	static boolean immediateContinueSupport = false;
	static MessageChannel immediateContinueChannel = null;
	static Runnable currentMsgChannelContinueHack = null;
	static ImmediateContinue currentLegacyContinueHack = null;
	private static final Object immediateContLock = new Object();

	static boolean hasFetchSupport = false;
	static boolean hasDataURLSupport = false;

	static boolean useVisualViewport = false;

	public static boolean isDeobfStackTraces = true;

	private static final JSObject steadyTimeFunc = getSteadyTimeFunc();

	@JSBody(params = { }, script = "return ((typeof performance !== \"undefined\") && (typeof performance.now === \"function\"))"
			+ "? performance.now.bind(performance)"
			+ ": (function(epochStart){ return function() { return Date.now() - epochStart; }; })(Date.now());")
	private static native JSObject getSteadyTimeFunc();

	private static interface WebGLContextEvent extends Event {
		@JSProperty
		String getStatusMessage();
	}

	public static void create() {
		win = Window.current();
		doc = win.getDocument();
		PlatformApplication.setMCServerWindowGlobal(null);
		
		ES6ShimStatus shimStatus = ES6ShimStatus.getRuntimeStatus();
		if(shimStatus != null) {
			EnumES6ShimStatus stat = shimStatus.getStatus();
			switch(stat) {
			case STATUS_ERROR:
			case STATUS_DISABLED_ERRORS:
				logger.error("ES6 Shim Status: {}", stat.statusDesc);
				break;
			case STATUS_ENABLED_ERRORS:
				logger.error("ES6 Shim Status: {}", stat.statusDesc);
				dumpShims(shimStatus.getShims());
				break;
			case STATUS_DISABLED:
			case STATUS_NOT_PRESENT:
				logger.info("ES6 Shim Status: {}", stat.statusDesc);
				break;
			case STATUS_ENABLED:
				logger.info("ES6 Shim Status: {}", stat.statusDesc);
				dumpShims(shimStatus.getShims());
				break;
			default:
				break;
			}
		}
		
		TeaVMBlobURLManager.initialize();
		
		logger.info("Creating main game canvas");
		
		root = doc.getElementById(ClientMain.configRootElementId);
		if(root == null) {
			throw new RuntimeInitializationFailureException("Root element \"" + ClientMain.configRootElementId + "\" was not found in this document!");
		}
		
		root.getClassList().add("_eaglercraftX_root_element");
		
		Node nodeler;
		while((nodeler = root.getLastChild()) != null && TeaVMUtils.isTruthy(nodeler)) {
			root.removeChild(nodeler);
		}

		CSSStyleDeclaration style = root.getStyle();
		style.setProperty("overflow", "hidden");

		TeaVMClientConfigAdapter teavmCfg = (TeaVMClientConfigAdapter) getClientConfigAdapter();
		boolean isEmbeddedInBody = root.getTagName().equalsIgnoreCase("body");

		useDelayOnSwap = teavmCfg.isUseDelayOnSwapTeaVM();

		parent = doc.createElement("div");
		parent.getClassList().add("_eaglercraftX_wrapper_element");
		style = parent.getStyle();
		style.setProperty("position", "relative");
		style.setProperty("width", "100%");
		style.setProperty("height", "100%");
		style.setProperty("overflow", "hidden");
		root.appendChild(parent);
		ClientMain.configRootElement = parent; // hack

		try {
			Thread.sleep(10l);
		} catch (InterruptedException e) {
		}

		useVisualViewport = false;
		if(teavmCfg.isUseVisualViewportTeaVM()) {
			if(isVisualViewportSupported()) {
				if(isEmbeddedInBody) {
					useVisualViewport = true;
				}else {
					HTMLElement bodyTag = doc.getBody();
					if (Math.abs(bodyTag.getClientWidth() - parent.getClientWidth()) <= 10
							&& Math.abs(bodyTag.getClientHeight() - parent.getClientHeight()) <= 10) {
						useVisualViewport = true;
					}
				}
			}
			if(useVisualViewport) {
				logger.info("Note: Detected game is embedded in body, some screens may be resized to window.visualViewport instead for a better mobile experience");
			}
		}
		
		ByteBuffer endiannessTestBytes = allocateByteBuffer(4);
		try {
			endiannessTestBytes.asIntBuffer().put(0x6969420);
			if (((endiannessTestBytes.get(0) & 0xFF) | ((endiannessTestBytes.get(1) & 0xFF) << 8)
					| ((endiannessTestBytes.get(2) & 0xFF) << 16) | ((endiannessTestBytes.get(3) & 0xFF) << 24)) != 0x6969420) {
				throw new PlatformIncompatibleException("Big endian CPU detected! (somehow)");
			}else {
				logger.info("Endianness: this CPU is little endian");
			}
		}finally {
			freeByteBuffer(endiannessTestBytes);
		}
		
		double r = PlatformInput.getDevicePixelRatio(win);
		if(r < 0.01) r = 1.0;
		int iw = parent.getClientWidth();
		int ih = parent.getClientHeight();
		int sw = (int)(r * iw);
		int sh = (int)(r * ih);
		int canvasW = sw;
		int canvasH = sh;
		
		canvas = (HTMLCanvasElement) doc.createElement("canvas");
		
		style = canvas.getStyle();
		canvas.getClassList().add("_eaglercraftX_canvas_element");
		style.setProperty("width", "100%");
		style.setProperty("height", "100%");
		style.setProperty("z-index", "1");
		style.setProperty("image-rendering", "pixelated");
		style.setProperty("touch-action", "pan-x pan-y");
		style.setProperty("-webkit-touch-callout", "none");
		style.setProperty("-webkit-tap-highlight-color", "rgba(255, 255, 255, 0)");

		canvas.setWidth(canvasW);
		canvas.setHeight(canvasH);
		
		parent.appendChild(canvas);
		
		try {
			win.addEventListener("message", windowMessageListener = new EventListener<MessageEvent>() {
				@Override
				public void handleEvent(MessageEvent evt) {
					handleWindowMessage(evt);
				}
			});
		}catch(Throwable t) {
			throw new RuntimeInitializationFailureException("Exception while registering window message event handlers", t);
		}
		
		checkImmediateContinueSupport();
		
		try {
			PlatformInput.initHooks(win, parent, canvas);
		}catch(Throwable t) {
			throw new RuntimeInitializationFailureException("Exception while registering window event handlers", t);
		}

		if(teavmCfg.isUseXHRFetchTeaVM()) {
			hasFetchSupport = false;
			logger.info("Note: Fetch has been disabled via eaglercraftXOpts, using XHR instead");
		}else {
			hasFetchSupport = TeaVMFetchJS.checkFetchSupport();
			if(!hasFetchSupport) {
				logger.error("Detected fetch as unsupported, using XHR instead!");
			}
		}

		hasDataURLSupport = TeaVMDataURLManager.checkDataURLSupport(hasFetchSupport);
		if(!hasDataURLSupport) {
			logger.error("Detected loading a data URL via fetch/XHR as unsupported!");
		}

		logger.info("Creating WebGL context");

		canvas.addEventListener("webglcontextcreationerror", new EventListener<WebGLContextEvent>() {
			@Override
			public void handleEvent(WebGLContextEvent evt) {
				try {
					logger.error("[WebGL Error]: {}", evt.getStatusMessage());
				}catch(Throwable t) {
				}
			}
		});

		int glesVer;
		boolean experimental = false;
		JSObject webgl_;
		if(teavmCfg.isForceWebGL2TeaVM()) {
			logger.info("Note: Forcing WebGL 2.0 context");
			glesVer = 300;
			webgl_ = canvas.getContext("webgl2", youEagler());
			if(webgl_ == null) {
				throw new PlatformIncompatibleException("WebGL 2.0 is not supported on this device!");
			}
		}else {
			if(teavmCfg.isForceWebGL1TeaVM()) {
				glesVer = 200;
				logger.info("Note: Forcing WebGL 1.0 context");
				webgl_ = canvas.getContext("webgl", youEagler());
				if(webgl_ == null) {
					if(teavmCfg.isAllowExperimentalWebGL1TeaVM()) {
						experimental = true;
						webgl_ = canvas.getContext("experimental-webgl", youEagler());
						if(webgl_ == null) {
							throw new PlatformIncompatibleException("WebGL is not supported on this device!");
						}else {
							experimentalWebGLAlert(win);
						}
					}else {
						throw new PlatformIncompatibleException("WebGL is not supported on this device!");
					}
				}
			}else {
				glesVer = 300;
				webgl_ = canvas.getContext("webgl2", youEagler());
				if(webgl_ == null) {
					glesVer = 200;
					webgl_ = canvas.getContext("webgl", youEagler());
					if(webgl_ == null) {
						if(teavmCfg.isAllowExperimentalWebGL1TeaVM()) {
							experimental = true;
							webgl_ = canvas.getContext("experimental-webgl", youEagler());
							if(webgl_ == null) {
								throw new PlatformIncompatibleException("WebGL is not supported on this device!");
							}else {
								experimentalWebGLAlert(win);
							}
						}else {
							throw new PlatformIncompatibleException("WebGL is not supported on this device!");
						}
					}
				}
			}
		}
		
		webgl = (WebGL2RenderingContext) webgl_;
		webglExperimental = experimental;
		PlatformOpenGL.setCurrentContext(glesVer, webgl);
		
		logger.info("OpenGL Version: {}", PlatformOpenGL._wglGetString(0x1F02));
		logger.info("OpenGL Renderer: {}", PlatformOpenGL._wglGetString(0x1F01));
		
		List<String> exts = PlatformOpenGL.dumpActiveExtensions();
		if(exts.isEmpty()) {
			logger.info("Unlocked the following OpenGL ES extensions: (NONE)");
		}else {
			Collections.sort(exts);
			logger.info("Unlocked the following OpenGL ES extensions:");
			for(int i = 0, l = exts.size(); i < l; ++i) {
				logger.info(" - {}", exts.get(i));
			}
		}
		
		mainFramebuffer = webgl.createFramebuffer();
		WebGLBackBuffer.initBackBuffer(webgl, mainFramebuffer, new OpenGLObjects.FramebufferGL(mainFramebuffer), sw, sh);
		PlatformInput.initWindowSize(sw, sh, (float)r);
		
		EarlyLoadScreen.paintScreen(glesVer, PlatformOpenGL.checkVAOCapable());
		
		if(PlatformAssets.assets == null || !PlatformAssets.assets.isEmpty()) {
			PlatformAssets.assets = new HashMap<>();
		}

		EPKDownloadHelper.downloadEPKFilesOfVersion(ClientMain.configEPKFiles,
				null,
				PlatformAssets.assets);

		logger.info("Loaded {} resources from EPKs", PlatformAssets.assets.size());

		byte[] finalLoadScreen = PlatformAssets.getResourceBytes("/assets/eagler/eagtek.png");

		if(finalLoadScreen != null) {
			EarlyLoadScreen.loadFinal(finalLoadScreen);
			EarlyLoadScreen.paintFinal(PlatformOpenGL.checkVAOCapable(), false);
		}else {
			PlatformOpenGL._wglClearColor(1.0f, 0.0f, 1.0f, 1.0f);
			PlatformOpenGL._wglClear(RealOpenGLEnums.GL_COLOR_BUFFER_BIT);
			PlatformInput.update();
		}

		logger.info("Initializing filesystem...");

		IEaglerFilesystem resourcePackFilesystem = Filesystem.getHandleFor(getClientConfigAdapter().getWorldsDB());
		VFile2.setPrimaryFilesystem(resourcePackFilesystem);

		logger.info("Initializing sound engine...");

		PlatformInput.pressAnyKeyScreen();

		if(finalLoadScreen != null) {
			EarlyLoadScreen.paintFinal(PlatformOpenGL.checkVAOCapable(), false);
		}else {
			PlatformOpenGL._wglClearColor(1.0f, 0.0f, 1.0f, 1.0f);
			PlatformOpenGL._wglClear(RealOpenGLEnums.GL_COLOR_BUFFER_BIT);
			PlatformInput.update();
		}

		logger.info("Platform initialization complete");
	}

	@JSBody(params = { "win" }, script = "win.alert(\"WARNING: Detected \\\"experimental\\\" WebGL 1.0 support, certain graphics API features may be missing, and therefore EaglercraftX may malfunction and crash!\");")
	private static native void experimentalWebGLAlert(Window win);

	private static void dumpShims(Set<EnumES6Shims> shims) {
		if(!shims.isEmpty()) {
			List<String> descriptions = new ArrayList<>();
            for (EnumES6Shims shim : shims) {
                descriptions.add(shim.shimDesc);
            }
			logger.info("(Enabled {} shims: {})", shims.size(), String.join(", ", descriptions));
		}
	}

	@JSBody(params = { }, script = "return {antialias: false, depth: false, powerPreference: \"high-performance\", desynchronized: true, preserveDrawingBuffer: false, premultipliedAlpha: false, alpha: false};")
	public static native JSObject youEagler();

	public static void destroy() {
		logger.fatal("Game tried to destroy the context! Browser runtime can't do that");
	}

	public static EnumPlatformType getPlatformType() {
		return EnumPlatformType.JAVASCRIPT;
	}

	public static EnumPlatformAgent getPlatformAgent() {
		return EnumPlatformAgent.getFromUA(getUserAgentString());
	}

	@JSBody(params = { }, script = "return navigator.userAgent||null;")
	public static native String getUserAgentString();

	@JSBody(params = { }, script = "return (typeof visualViewport !== \"undefined\");")
	private static native boolean isVisualViewportSupported();

	@JSBody(params = { }, script = "return visualViewport;")
	static native VisualViewport getVisualViewport();

	public static void requestANGLE(EnumPlatformANGLE plaf) {
	}

	public static EnumPlatformANGLE getPlatformANGLE() {
		return EnumPlatformANGLE.fromGLRendererString(getGLRenderer());
	}

	public static String getGLVersion() {
		String ret = PlatformOpenGL._wglGetString(RealOpenGLEnums.GL_VERSION);
		if(ret != null) {
			return ret;
		}else {
			return "null";
		}
	}

	public static String getGLRenderer() {
		String ret = PlatformOpenGL._wglGetString(RealOpenGLEnums.GL_RENDERER);
		if(ret != null) {
			return ret;
		}else {
			return "null";
		}
	}

	public static ByteBuffer allocateByteBuffer(int length) {
		return EaglerArrayBufferAllocator.allocateByteBuffer(length);
	}

	public static IntBuffer allocateIntBuffer(int length) {
		return EaglerArrayBufferAllocator.allocateIntBuffer(length);
	}

	public static FloatBuffer allocateFloatBuffer(int length) {
		return EaglerArrayBufferAllocator.allocateFloatBuffer(length);
	}

	public static ByteBuffer castPrimitiveByteArray(byte[] array) {
		return EaglerArrayBufferAllocator.wrapByteBufferTeaVM(TeaVMUtils.unwrapByteArray(array));
	}

	public static IntBuffer castPrimitiveIntArray(int[] array) {
		return EaglerArrayBufferAllocator.wrapIntBufferTeaVM(TeaVMUtils.unwrapIntArray(array));
	}

	public static FloatBuffer castPrimitiveFloatArray(float[] array) {
		return EaglerArrayBufferAllocator.wrapFloatBufferTeaVM(TeaVMUtils.unwrapFloatArray(array));
	}

	public static byte[] castNativeByteBuffer(ByteBuffer buffer) {
		return TeaVMUtils.wrapUnsignedByteArray(EaglerArrayBufferAllocator.getDataView8Unsigned(buffer));
	}

	public static int[] castNativeIntBuffer(IntBuffer buffer) {
		return TeaVMUtils.wrapIntArray(EaglerArrayBufferAllocator.getDataView32(buffer));
	}

	public static float[] castNativeFloatBuffer(FloatBuffer buffer) {
		return TeaVMUtils.wrapFloatArray(EaglerArrayBufferAllocator.getDataView32F(buffer));
	}

	public static void freeByteBuffer(ByteBuffer byteBuffer) {
		
	}
	
	public static void freeIntBuffer(IntBuffer intBuffer) {
		
	}
	
	public static void freeFloatBuffer(FloatBuffer floatBuffer) {
		
	}

	public static boolean hasFetchSupportTeaVM() {
		return hasFetchSupport;
	}

	public static void downloadRemoteURIByteArray(String assetPackageURI, final Consumer<byte[]> cb) {
		downloadRemoteURIByteArray(assetPackageURI, false, cb);
	}

	public static void downloadRemoteURIByteArray(String assetPackageURI, boolean useCache, final Consumer<byte[]> cb) {
		downloadRemoteURI(assetPackageURI, useCache, arr -> cb.accept(TeaVMUtils.wrapByteArrayBuffer(arr)));
	}

	public static void downloadRemoteURI(String assetPackageURI, final Consumer<ArrayBuffer> cb) {
		downloadRemoteURI(assetPackageURI, false, cb);
	}

	public static void downloadRemoteURI(String assetPackageURI, boolean useCache, final Consumer<ArrayBuffer> cb) {
		if(hasFetchSupport) {
			downloadRemoteURIFetch(assetPackageURI, useCache, new AsyncCallback<ArrayBuffer>() {
				@Override
				public void complete(ArrayBuffer result) {
					cb.accept(result);
				}
	
				@Override
				public void error(Throwable e) {
					EagRuntime.debugPrintStackTrace(e);
					cb.accept(null);
				}
			});
		}else {
			downloadRemoteURIXHR(assetPackageURI, new AsyncCallback<ArrayBuffer>() {
				@Override
				public void complete(ArrayBuffer result) {
					cb.accept(result);
				}
	
				@Override
				public void error(Throwable e) {
					EagRuntime.debugPrintStackTrace(e);
					cb.accept(null);
				}
			});
		}
	}

	@Async
	private static native ArrayBuffer downloadRemoteURIXHR(final String assetPackageURI);

	private static void downloadRemoteURIXHR(final String assetPackageURI, final AsyncCallback<ArrayBuffer> cb) {
		final boolean isDat = isDataURL(assetPackageURI);
		if(isDat && !hasDataURLSupport) {
			cb.complete(TeaVMUtils.unwrapArrayBuffer(TeaVMDataURLManager.decodeDataURLFallback(assetPackageURI)));
			return;
		}
		TeaVMFetchJS.doXHRDownload(assetPackageURI, isDat ? (data) -> {
					if(data != null) {
						cb.complete(data);
					}else {
						logger.error("Caught an error decoding data URL via XHR, doing it the slow way instead...");
						byte[] b = null;
						try {
							b = TeaVMDataURLManager.decodeDataURLFallback(assetPackageURI);
						}catch(Throwable t) {
							logger.error("Failed to manually decode data URL!", t);
							cb.complete(null);
							return;
						}
						cb.complete(b == null ? null : TeaVMUtils.unwrapArrayBuffer(b));
					}
				} : cb::complete);
	}

	@Async
	private static native ArrayBuffer downloadRemoteURIFetch(final String assetPackageURI, final boolean forceCache);

	private static void downloadRemoteURIFetch(final String assetPackageURI, final boolean useCache, final AsyncCallback<ArrayBuffer> cb) {
		final boolean isDat = isDataURL(assetPackageURI);
		if(isDat && !hasDataURLSupport) {
			cb.complete(TeaVMUtils.unwrapArrayBuffer(TeaVMDataURLManager.decodeDataURLFallback(assetPackageURI)));
			return;
		}
		TeaVMFetchJS.doFetchDownload(assetPackageURI, useCache ? "force-cache" : "no-store",
				isDat ? (data) -> {
					if(data != null) {
						cb.complete(data);
					}else {
						logger.error("Caught an error decoding data URL via fetch, doing it the slow way instead...");
						byte[] b = null;
						try {
							b = TeaVMDataURLManager.decodeDataURLFallback(assetPackageURI);
						}catch(Throwable t) {
							logger.error("Failed to manually decode data URL!", t);
							cb.complete(null);
							return;
						}
						cb.complete(b == null ? null : TeaVMUtils.unwrapArrayBuffer(b));
					}
				} : cb::complete);
	}

	public static ArrayBuffer downloadRemoteURI(String assetPackageURI) {
		if(hasFetchSupport) {
			return downloadRemoteURIFetch(assetPackageURI, true);
		}else {
			return downloadRemoteURIXHR(assetPackageURI);
		}
	}

	public static ArrayBuffer downloadRemoteURI(final String assetPackageURI, final boolean forceCache) {
		if(hasFetchSupport) {
			return downloadRemoteURIFetch(assetPackageURI, forceCache);
		}else {
			return downloadRemoteURIXHR(assetPackageURI);
		}
	}
	
	private static boolean isDataURL(String url) {
		return url.length() > 5 && url.substring(0, 5).equalsIgnoreCase("data:");
	}
	
	public static boolean isDebugRuntime() {
		return false;
	}
	
	public static void writeCrashReport(String crashDump) {
		ClientMain.showCrashScreen(crashDump);
	}

	@JSBody(params = { "evt", "mainWin" }, script = "return evt.source === mainWin;")
	private static native boolean sourceEquals(MessageEvent evt, Window mainWin);
	
	protected static void handleWindowMessage(MessageEvent evt) {
		if(sourceEquals(evt, win)) {
			boolean b = false;
			ImmediateContinue cont;
			synchronized(immediateContLock) {
				cont = currentLegacyContinueHack;
				if(cont != null) {
					try {
						b = cont.isValidToken(evt.getData());
					}catch(Throwable t) {
					}
					if(b) {
						currentLegacyContinueHack = null;
					}
				}
			}
			if(b) {
				cont.execute();
			}
		}
	}

	public static void swapDelayTeaVM() {
		if(!useDelayOnSwap && immediateContinueSupport) {
			immediateContinueTeaVM0();
		}else {
			sleep(0);
		}
	}

	public static void immediateContinue() {
		if(immediateContinueSupport) {
			immediateContinueTeaVM0();
		}else {
			sleep(0);
		}
	}

	public static boolean immediateContinueSupported() {
		return immediateContinueSupport;
	}

	@Async
	private static native void immediateContinueTeaVM0();

	private static void immediateContinueTeaVM0(final AsyncCallback<Void> cb) {
		synchronized(immediateContLock) {
			if(immediateContinueChannel != null) {
				if(currentMsgChannelContinueHack != null) {
					cb.error(new IllegalStateException("Main thread is already waiting for an immediate continue callback!"));
					return;
				}
				currentMsgChannelContinueHack = () -> {
					cb.complete(null);
				};
				try {
					immediateContinueChannel.getPort2().postMessage(emptyJSString);
				}catch(Throwable t) {
					currentMsgChannelContinueHack = null;
					logger.error("Caught error posting immediate continue, using setTimeout instead");
					Window.setTimeout(() -> cb.complete(null), 0);
				}
			}else {
				if(currentLegacyContinueHack != null) {
					cb.error(new IllegalStateException("Main thread is already waiting for an immediate continue callback!"));
					return;
				}
				final JSString token = JSString.valueOf(EaglercraftUUID.randomUUID().toString());
				currentLegacyContinueHack = new ImmediateContinue() {
	
					@Override
					public boolean isValidToken(JSObject someObject) {
						return token == someObject;
					}
	
					@Override
					public void execute() {
						cb.complete(null);
					}
	
				};
				try {
					win.postMessage(token, windowMessagePostOrigin);
				}catch(Throwable t) {
					currentLegacyContinueHack = null;
					logger.error("Caught error posting immediate continue, using setTimeout instead");
					Window.setTimeout(() -> cb.complete(null), 0);
				}
			}
		}
	}

	private static void checkImmediateContinueSupport() {
		immediateContinueSupport = false;
		windowMessagePostOrigin = getOriginForPost(win);

		int stat = checkImmediateContinueSupport0();
		if(stat == IMMEDIATE_CONT_SUPPORTED) {
			immediateContinueSupport = true;
			return;
		}else if(stat == IMMEDIATE_CONT_FAILED_NOT_ASYNC) {
			logger.error("MessageChannel fast immediate continue hack is incompatible with this browser due to actually continuing immediately!");
		}else if(stat == IMMEDIATE_CONT_FAILED_NOT_CONT) {
			logger.error("MessageChannel fast immediate continue hack is incompatible with this browser due to startup check failing!");
		}else if(stat == IMMEDIATE_CONT_FAILED_EXCEPTIONS) {
			logger.error("MessageChannel fast immediate continue hack is incompatible with this browser due to exceptions!");
		}
		logger.info("Note: Using legacy fast immediate continue based on window.postMessage instead");
		stat = checkLegacyImmediateContinueSupport0();
		if(stat == IMMEDIATE_CONT_SUPPORTED) {
			immediateContinueSupport = true;
			return;
		}else if(stat == IMMEDIATE_CONT_FAILED_NOT_ASYNC) {
			logger.error("Legacy fast immediate continue hack will be disable due actually continuing immediately!");
			return;
		}
		logger.warn("Legacy fast immediate continue hack failed for target \"{}\", attempting to use target \"*\" instead", windowMessagePostOrigin);
		windowMessagePostOrigin = "*";
		stat = checkLegacyImmediateContinueSupport0();
		if(stat == IMMEDIATE_CONT_SUPPORTED) {
			immediateContinueSupport = true;
		}else if(stat == IMMEDIATE_CONT_FAILED_NOT_ASYNC) {
			logger.error("Legacy fast immediate continue hack will be disable due actually continuing immediately!");
		}else if(stat == IMMEDIATE_CONT_FAILED_NOT_CONT) {
			logger.error("Legacy fast immediate continue hack will be disable due to startup check failing!");
		}else if(stat == IMMEDIATE_CONT_FAILED_EXCEPTIONS) {
			logger.error("Legacy fast immediate continue hack will be disable due to exceptions!");
		}
	}

	private static final JSString emptyJSString = JSString.valueOf("");

	private static final int IMMEDIATE_CONT_SUPPORTED = 0;
	private static final int IMMEDIATE_CONT_FAILED_NOT_ASYNC = 1;
	private static final int IMMEDIATE_CONT_FAILED_NOT_CONT = 2;
	private static final int IMMEDIATE_CONT_FAILED_EXCEPTIONS = 3;

	private static int checkImmediateContinueSupport0() {
		try {
			if(!MessageChannel.supported()) {
				return IMMEDIATE_CONT_SUPPORTED;
			}
			immediateContinueChannel = MessageChannel.create();
			immediateContinueChannel.getPort1().addEventListener("message", new EventListener<MessageEvent>() {
				@Override
				public void handleEvent(MessageEvent evt) {
					Runnable toRun;
					synchronized(immediateContLock) {
						toRun = currentMsgChannelContinueHack;
						currentMsgChannelContinueHack = null;
					}
					if(toRun != null) {
						toRun.run();
					}
				}
			});
			immediateContinueChannel.getPort1().start();
			immediateContinueChannel.getPort2().start();
			final boolean[] checkMe = new boolean[1];
			checkMe[0] = false;
			currentMsgChannelContinueHack = () -> {
				checkMe[0] = true;
			};
			immediateContinueChannel.getPort2().postMessage(emptyJSString);
			if(checkMe[0]) {
				currentMsgChannelContinueHack = null;
				if(immediateContinueChannel != null) {
					safeShutdownChannel(immediateContinueChannel);
				}
				immediateContinueChannel = null;
				return IMMEDIATE_CONT_FAILED_NOT_ASYNC;
			}
			sleep(10);
			currentMsgChannelContinueHack = null;
			if(!checkMe[0]) {
				if(immediateContinueChannel != null) {
					safeShutdownChannel(immediateContinueChannel);
				}
				immediateContinueChannel = null;
				return IMMEDIATE_CONT_FAILED_NOT_CONT;
			}else {
				return IMMEDIATE_CONT_SUPPORTED;
			}
		}catch(Throwable t) {
			currentMsgChannelContinueHack = null;
			if(immediateContinueChannel != null) {
				safeShutdownChannel(immediateContinueChannel);
			}
			immediateContinueChannel = null;
			return IMMEDIATE_CONT_FAILED_EXCEPTIONS;
		}
	}

	private static void safeShutdownChannel(MessageChannel chan) {
		try {
			chan.getPort1().close();
		}catch(Throwable tt) {
		}
		try {
			chan.getPort2().close();
		}catch(Throwable tt) {
		}
	}

	private static int checkLegacyImmediateContinueSupport0() {
		try {
			final JSString token = JSString.valueOf(EaglercraftUUID.randomUUID().toString());
			final boolean[] checkMe = new boolean[1];
			checkMe[0] = false;
			currentLegacyContinueHack = new ImmediateContinue() {

				@Override
				public boolean isValidToken(JSObject someObject) {
					return token == someObject;
				}

				@Override
				public void execute() {
					checkMe[0] = true;
				}

			};
			win.postMessage(token, windowMessagePostOrigin);
			if(checkMe[0]) {
				currentLegacyContinueHack = null;
				return IMMEDIATE_CONT_FAILED_NOT_ASYNC;
			}
			sleep(10);
			currentLegacyContinueHack = null;
			if(!checkMe[0]) {
				return IMMEDIATE_CONT_FAILED_NOT_CONT;
			}else {
				return IMMEDIATE_CONT_SUPPORTED;
			}
		}catch(Throwable t) {
			currentLegacyContinueHack = null;
			return IMMEDIATE_CONT_FAILED_EXCEPTIONS;
		}
	}

	@JSBody(params = { "win" }, script = "if((typeof location.origin === \"string\") && location.origin.length > 0) {"
			+ "var orig = location.origin; if(orig.indexOf(\"file:\") === 0) orig = \"null\"; return orig; }"
			+ "else return \"*\";")
	private static native String getOriginForPost(Window win);

	public static void removeEventHandlers() {
		try {
			immediateContinueSupport = false;
			if(windowMessageListener != null) {
				win.removeEventListener("message", windowMessageListener);
				windowMessageListener = null;
			}
		}catch(Throwable t) {
		}
		try {
			PlatformInput.removeEventHandlers();
		}catch(Throwable t) {
		}
	}
	
	public static void getStackTrace(Throwable t, Consumer<String> ret) {
		JSObject o = JSExceptions.getJSException(t);
		if(o != null && TeaVMUtils.isTruthy(o)) {
			try {
				String stack = TeaVMUtils.getStackSafe(o);
				if(stack != null) {
					String[] stackElements = stack.split("[\\r\\n]+");
					if(stackElements.length > 0) {
						if(isDeobfStackTraces) {
							TeaVMRuntimeDeobfuscator.initialize();
							TeaVMRuntimeDeobfuscator.deobfExceptionStack(Arrays.asList(stackElements));
						}
						for(int i = 0; i < stackElements.length; ++i) {
							String str = stackElements[i].trim();
							if(str.startsWith("at ")) {
								str = str.substring(3).trim();
							}
							ret.accept(str);
						}
						return;
					}
				}
			}catch(Throwable tt) {
				ret.accept("[ error: " + tt.toString() + " ]");
			}
		}
		getFallbackStackTrace(t, ret);
	}
	
	private static void getFallbackStackTrace(Throwable t, Consumer<String> ret) {
		StackTraceElement[] el = t.getStackTrace();
		if(el.length > 0) {
			for(int i = 0; i < el.length; ++i) {
				ret.accept(el[i].toString());
			}
		}else {
			ret.accept("[no stack trace]");
		}
	}
	
	@JSBody(params = { "o" }, script = "console.error(o);")
	public static native void printNativeExceptionToConsoleTeaVM(JSObject o);
	
	public static boolean printJSExceptionIfBrowser(Throwable t) {
		if(t != null) {
			JSObject o = JSExceptions.getJSException(t);
			if(o != null && TeaVMUtils.isTruthy(o)) {
				printNativeExceptionToConsoleTeaVM(o);
				return true;
			}
		}
		return false;
	}

	public static void exit() {
		logger.fatal("Game is attempting to exit!");
	}

	public static void setThreadName(String string) {
		currentThreadName = string;
	}

	public static long maxMemory() {
		return 1073741824l;
	}

	public static long totalMemory() {
		return 1073741824l;
	}

	public static long freeMemory() {
		return 1073741824l;
	}
	
	public static String getCallingClass(int backTrace) {
		return null;
	}
	
	public static OutputStream newDeflaterOutputStream(OutputStream os) throws IOException {
		return new DeflaterOutputStream(os);
	}
	
	@SuppressWarnings("deprecation")
	public static int deflateFull(byte[] input, int inputOff, int inputLen, byte[] output, int outputOff,
			int outputLen) throws IOException {
		Deflater df = new Deflater();
		df.setInput(input, inputOff, inputLen, false);
		df.setOutput(output, outputOff, outputLen);
		df.init(5);
		int c;
		do {
			c = df.deflate(4);
			if(c != 0 && c != 1) {
				throw new IOException("Deflater failed! Code " + c);
			}
		}while(c != 1);
		return (int)df.getTotalOut();
	}
	
	public static OutputStream newGZIPOutputStream(OutputStream os) throws IOException {
		return new GZIPOutputStream(os);
	}
	
	public static InputStream newInflaterInputStream(InputStream is) throws IOException {
		return new InflaterInputStream(is);
	}
	
	@SuppressWarnings("deprecation")
	public static int inflateFull(byte[] input, int inputOff, int inputLen, byte[] output, int outputOff,
			int outputLen) throws IOException {
		Inflater df = new Inflater();
		df.setInput(input, inputOff, inputLen, false);
		df.setOutput(output, outputOff, outputLen);
		int c;
		do {
			c = df.inflate(0);
			if(c != 0 && c != 1) {
				throw new IOException("Inflater failed! Code " + c);
			}
		}while(c != 1);
		return (int)df.getTotalOut();
	}
	
	public static InputStream newGZIPInputStream(InputStream is) throws IOException {
		return new GZIPInputStream(is);
	}
	
	@JSBody(params = { }, script = "return location.protocol && location.protocol.toLowerCase() === \"https:\";")
	public static native boolean requireSSL();
	
	@JSBody(params = { }, script = "return location.protocol && location.protocol.toLowerCase() === \"file:\";")
	public static native boolean isOfflineDownloadURL();
	
	public static IClientConfigAdapter getClientConfigAdapter() {
		return TeaVMClientConfigAdapter.instance;
	}

	public static long randomSeed() {
		return (long)(Math.random() * 9007199254740991.0);
	}

	private static String currentThreadName = "main";

	public static String currentThreadName() {
		return currentThreadName;
	}

	@JSBody(params = { "steadyTimeFunc" }, script = "return steadyTimeFunc();")
	private static native double steadyTimeMillis0(JSObject steadyTimeFunc);

	public static double steadyTimeMillisTeaVM() {
		return steadyTimeMillis0(steadyTimeFunc);
	}

	public static long steadyTimeMillis() {
		return (long)steadyTimeMillis0(steadyTimeFunc);
	}

	public static long nanoTime() {
		return (long)(steadyTimeMillis0(steadyTimeFunc) * 1000000.0);
	}

	@Async
	public static native void sleep(int millis);

	private static void sleep(int millis, final AsyncCallback<Void> callback) {
		Platform.schedule(new DumbSleepHandler(callback), millis);
	}

	private static class DumbSleepHandler implements PlatformRunnable {
		private final AsyncCallback<Void> callback;
		private DumbSleepHandler(AsyncCallback<Void> callback) {
			this.callback = callback;
		}
		@Override
		public void run() {
			callback.complete(null);
		}
	}

	@JSBody(params = {}, script = "delete __isEaglerX188Running;")
	private static native void clearRunningFlag();

	public static void postCreate() {
		EarlyLoadScreen.paintFinal(true, true);
		EarlyLoadScreen.destroy();
	}

	static void beforeUnload() {
	}

}