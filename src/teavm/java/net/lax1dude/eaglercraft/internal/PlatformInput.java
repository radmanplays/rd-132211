/*
 * Copyright (c) 2022-2024 lax1dude, ayunami2000. All Rights Reserved.
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

package net.lax1dude.eaglercraft.internal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.teavm.interop.Async;
import org.teavm.interop.AsyncCallback;
import org.teavm.jso.JSBody;
import org.teavm.jso.JSFunctor;
import org.teavm.jso.JSObject;
import org.teavm.jso.browser.Navigator;
import org.teavm.jso.browser.TimerHandler;
import org.teavm.jso.browser.Window;
import org.teavm.jso.core.JSNumber;
import org.teavm.jso.dom.css.CSSStyleDeclaration;
import org.teavm.jso.dom.events.Event;
import org.teavm.jso.dom.events.EventListener;
import org.teavm.jso.dom.events.KeyboardEvent;
import org.teavm.jso.dom.events.MouseEvent;
import org.teavm.jso.dom.events.WheelEvent;
import org.teavm.jso.dom.html.HTMLCanvasElement;
import org.teavm.jso.dom.html.HTMLDocument;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLFormElement;
import org.teavm.jso.dom.html.HTMLInputElement;
import org.teavm.jso.dom.html.TextRectangle;

import net.lax1dude.eaglercraft.KeyboardConstants;
import net.lax1dude.eaglercraft.internal.teavm.ClientMain;
import net.lax1dude.eaglercraft.internal.teavm.EarlyLoadScreen;
import net.lax1dude.eaglercraft.internal.teavm.InputEvent;
import net.lax1dude.eaglercraft.internal.teavm.LegacyKeycodeTranslator;
import net.lax1dude.eaglercraft.internal.teavm.TeaVMClientConfigAdapter;
import net.lax1dude.eaglercraft.internal.teavm.TeaVMUtils;
import net.lax1dude.eaglercraft.internal.teavm.VisualViewport;
import net.lax1dude.eaglercraft.internal.teavm.WebGLBackBuffer;

public class PlatformInput {

	private static Window win = null;
	private static HTMLElement parent = null;
	private static HTMLCanvasElement canvas = null;

	private static EventListener<?> contextmenu = null;
	private static EventListener<?> mousedown = null;
	private static EventListener<?> mouseup = null;
	private static EventListener<?> mousemove = null;
	private static EventListener<?> mouseenter = null;
	private static EventListener<?> mouseleave = null;
	private static EventListener<?> keydown = null;
	private static EventListener<?> keyup = null;
	private static EventListener<?> wheel = null;
	private static EventListener<?> focus = null;
	private static EventListener<?> blur = null;
	private static EventListener<?> pointerlock = null;
	private static EventListener<?> pointerlockerr = null;
	private static EventListener<?> fullscreen = null;
	private static EventListener<?> visibilitychange = null;

	private static Map<String, LegacyKeycodeTranslator.LegacyKeycode> keyCodeTranslatorMap = null;

	public static Map<String, LegacyKeycodeTranslator.LegacyKeycode> getKeyCodeTranslatorMapTeaVM() {
		return keyCodeTranslatorMap;
	}

	private static final List<String> pastedStrings = new LinkedList<>();

	private static final int EVENT_KEY_DOWN = 0;
	private static final int EVENT_KEY_UP = 1;
	private static final int EVENT_KEY_REPEAT = 2;

	private static class VKeyEvent {

		private final int keyCode;
		private final int location;
		private final int eagKey;
		private final char keyChar;
		private final int type;

		private VKeyEvent(int keyCode, int location, int eagKey, char keyChar, int type) {
			this.keyCode = keyCode;
			this.location = location;
			this.eagKey = eagKey;
			this.keyChar = keyChar;
			this.type = type;
		}

	}

	private static final int EVENT_MOUSE_DOWN = 0;
	private static final int EVENT_MOUSE_UP = 1;
	private static final int EVENT_MOUSE_MOVE = 2;
	private static final int EVENT_MOUSE_WHEEL = 3;

	private static class VMouseEvent {

		private final int posX;
		private final int posY;
		private final int button;
		private final float wheel;
		private final int type;

		private VMouseEvent(int posX, int posY, int button, float wheel, int type) {
			this.posX = posX;
			this.posY = posY;
			this.button = button;
			this.wheel = wheel;
			this.type = type;
		}

	}

	private static final List<VMouseEvent> mouseEvents = new LinkedList<>();
	private static final List<VKeyEvent> keyEvents = new LinkedList<>();

	private static boolean hasShownPressAnyKey = false;
	private static boolean isOnMobilePressAnyKey = false;

	private static interface MobilePressAnyKeyHandler {
		void call();
	}

	private static HTMLElement mobilePressAnyKeyScreen = null;
	private static MobilePressAnyKeyHandler mobilePressAnyKey = null;
	static boolean isLikelyMobileBrowser = false;

	private static int mouseX = 0;
	private static int mouseY = 0;
	private static double mouseDX = 0.0D;
	private static double mouseDY = 0.0D;
	private static double mouseDWheel = 0.0D;
	private static boolean enableRepeatEvents = true;
	private static boolean isWindowFocused = true;
	private static boolean isMouseOverWindow = true;
	static boolean unpressCTRL = false;

	private static int windowWidth = -1;
	private static int windowHeight = -1;
	private static float windowDPI = 1.0f;
	private static int visualViewportX = -1;
	private static int visualViewportY = -1;
	private static int visualViewportW = -1;
	private static int visualViewportH = -1;
	private static int lastWasResizedWindowWidth = -2;
	private static int lastWasResizedWindowHeight = -2;
	private static float lastWasResizedWindowDPI = -2.0f;
	private static int lastWasResizedVisualViewportX = -2;
	private static int lastWasResizedVisualViewportY = -2;
	private static int lastWasResizedVisualViewportW = -2;
	private static int lastWasResizedVisualViewportH = -2;

	private static VMouseEvent currentEvent = null;
	private static VKeyEvent currentEventK = null;
	private static boolean[] buttonStates = new boolean[8];
	private static boolean[] keyStates = new boolean[256];

	private static int functionKeyModifier = KeyboardConstants.KEY_F;

	// Can't support webkit vendor prefix since there's no
	// document.pointerLockElement
	private static final int POINTER_LOCK_NONE = 0;
	private static final int POINTER_LOCK_CORE = 1;
	private static final int POINTER_LOCK_MOZ = 2;
	private static int pointerLockSupported = POINTER_LOCK_NONE;
	private static long mouseUngrabTimer = 0l;
	private static long mouseGrabTimer = 0l;
	private static int mouseUngrabTimeout = -1;
	private static boolean pointerLockFlag = false;
	private static boolean pointerLockWaiting = false;

	private static final int FULLSCREEN_NONE = 0;
	private static final int FULLSCREEN_CORE = 1;
	private static final int FULLSCREEN_WEBKIT = 2;
	private static final int FULLSCREEN_MOZ = 3;
	private static int fullscreenSupported = FULLSCREEN_NONE;

	private static JSObject fullscreenQuery = null;

	public static boolean keyboardLockSupported = false;
	public static boolean lockKeys = false;

	static boolean vsync = true;
	static boolean vsyncSupport = false;
	static boolean finish = true;

	private static int vsyncTimeout = -1;

	@JSFunctor
	private static interface UnloadCallback extends JSObject {
		void call();
	}

	@JSBody(params = { "win",
			"cb" }, script = "win.__curEaglerX188UnloadListenerCB = cb; if((typeof win.__isEaglerX188UnloadListenerSet === \"string\") && win.__isEaglerX188UnloadListenerSet === \"yes\") return; win.onbeforeunload = function(evt) { if(win.__curEaglerX188UnloadListenerCB) win.__curEaglerX188UnloadListenerCB(); return false; }; win.__isEaglerX188UnloadListenerSet = \"yes\";")
	private static native void onBeforeCloseRegister(Window win, UnloadCallback cb);

	static void initHooks(Window window, HTMLElement parent_, HTMLCanvasElement canvaz) {
		win = window;
		parent = parent_;
		canvas = canvaz;
		canvas.getStyle().setProperty("cursor", "default");
		lastWasResizedWindowWidth = -2;
		lastWasResizedWindowHeight = -2;
		lastWasResizedWindowDPI = -2.0f;
		lastWasResizedVisualViewportX = -2;
		lastWasResizedVisualViewportY = -2;
		lastWasResizedVisualViewportW = -2;
		lastWasResizedVisualViewportH = -2;
		hasShownPressAnyKey = false;

		PlatformRuntime.logger.info("Loading keyboard layout data");

		LegacyKeycodeTranslator keycodeTranslator = new LegacyKeycodeTranslator();
		if (checkKeyboardLayoutSupported()) {
			try {
				iterateKeyboardLayout(keycodeTranslator::addBrowserLayoutMapping);
			} catch (Throwable t) {
				PlatformRuntime.logger.error(
						"Caught exception querying keyboard layout from browser, using the default layout instead");
				PlatformRuntime.logger.error(t);
			}
			int cnt = keycodeTranslator.getRemappedKeyCount();
			if (cnt > 0) {
				PlatformRuntime.logger.info("KeyboardLayoutMap remapped {} keys from their default codes", cnt);
			}
		}
		keyCodeTranslatorMap = keycodeTranslator.buildLayoutTable();

		parent.addEventListener("contextmenu", contextmenu = new EventListener<MouseEvent>() {
			@Override
			public void handleEvent(MouseEvent evt) {
				if (evt.getTarget() == ClientMain.integratedServerCrashPanel)
					return;
				evt.preventDefault();
				evt.stopPropagation();
			}
		});
		canvas.addEventListener("mousedown", mousedown = new EventListener<MouseEvent>() {
			@Override
			public void handleEvent(MouseEvent evt) {
				evt.preventDefault();
				evt.stopPropagation();
				handleWindowFocus();
				if (tryGrabCursorHook())
					return;
				int b = evt.getButton();
				b = b == 1 ? 2 : (b == 2 ? 1 : b);
				if (b >= 0 && b < buttonStates.length)
					buttonStates[b] = true;
				int eventX = (int) (getOffsetX(evt, 0) * windowDPI);
				int eventY = windowHeight - (int) (getOffsetY(evt, 0) * windowDPI) - 1;
				synchronized (mouseEvents) {
					mouseEvents.add(new VMouseEvent(eventX, eventY, b, 0.0f, EVENT_MOUSE_DOWN));
					if (mouseEvents.size() > 64) {
						mouseEvents.remove(0);
					}
				}
			}
		});
		canvas.addEventListener("mouseup", mouseup = new EventListener<MouseEvent>() {
			@Override
			public void handleEvent(MouseEvent evt) {
				evt.preventDefault();
				evt.stopPropagation();
				int b = evt.getButton();
				b = b == 1 ? 2 : (b == 2 ? 1 : b);
				if (b >= 0 && b < buttonStates.length)
					buttonStates[b] = false;
				int eventX = (int) (getOffsetX(evt, 0) * windowDPI);
				int eventY = windowHeight - (int) (getOffsetY(evt, 0) * windowDPI) - 1;
				synchronized (mouseEvents) {
					mouseEvents.add(new VMouseEvent(eventX, eventY, b, 0.0f, EVENT_MOUSE_UP));
					if (mouseEvents.size() > 64) {
						mouseEvents.remove(0);
					}
				}
			}
		});
		canvas.addEventListener("mousemove", mousemove = new EventListener<MouseEvent>() {
			@Override
			public void handleEvent(MouseEvent evt) {
				evt.preventDefault();
				evt.stopPropagation();
				mouseX = (int) (getOffsetX(evt, 0) * windowDPI);
				mouseY = windowHeight - (int) (getOffsetY(evt, 0) * windowDPI) - 1;
				if (pointerLockFlag) {
					mouseDX += evt.getMovementX();
					mouseDY += -evt.getMovementY();
				}
				if (hasShownPressAnyKey) {
					int eventX = (int) (getOffsetX(evt, 0) * windowDPI);
					int eventY = windowHeight - (int) (getOffsetY(evt, 0) * windowDPI) - 1;
					synchronized (mouseEvents) {
						mouseEvents.add(new VMouseEvent(eventX, eventY, -1, 0.0f, EVENT_MOUSE_MOVE));
						if (mouseEvents.size() > 64) {
							mouseEvents.remove(0);
						}
					}
				}
			}
		});
		canvas.addEventListener("mouseenter", mouseenter = new EventListener<MouseEvent>() {
			@Override
			public void handleEvent(MouseEvent evt) {
				isMouseOverWindow = true;
			}
		});
		canvas.addEventListener("mouseleave", mouseleave = new EventListener<MouseEvent>() {
			@Override
			public void handleEvent(MouseEvent evt) {
				isMouseOverWindow = false;
			}
		});
		win.addEventListener("keydown", keydown = new EventListener<KeyboardEvent>() {
			@Override
			public void handleEvent(KeyboardEvent evt) {
				if (!ClientMain.integratedServerCrashPanelShowing) {
					evt.preventDefault();
					evt.stopPropagation();
				}
				if (!enableRepeatEvents && evt.isRepeat())
					return;
				LegacyKeycodeTranslator.LegacyKeycode keyCode = null;
				if (keyCodeTranslatorMap != null && hasCodeVar(evt)) {
					keyCode = keyCodeTranslatorMap.get(evt.getCode());
				}
				int w;
				int loc;
				if (keyCode != null) {
					w = keyCode.keyCode;
					loc = keyCode.location;
				} else {
					w = getWhich(evt);
					loc = getLocationSafe(evt);
				}
				if (w == 122 && !evt.isRepeat()) { // F11
					toggleFullscreen();
				}
				int ww = processFunctionKeys(w);
				int eag = KeyboardConstants.getEaglerKeyFromBrowser(ww, ww == w ? loc : 0);
				if (eag != 0) {
					keyStates[eag] = true;
				}
				String s = getCharOrNull(evt);
				int l = s.length();
				char c;
				if (l == 1) {
					c = s.charAt(0);
				} else if (l == 0) {
					c = keyToAsciiLegacy(w, evt.isShiftKey());
				} else if (s.equals("Unidentified")) {
					return;
				} else {
					c = '\0';
				}
				synchronized (keyEvents) {
					keyEvents.add(new VKeyEvent(ww, loc, eag, c, EVENT_KEY_DOWN));
					if (keyEvents.size() > 64) {
						keyEvents.remove(0);
					}
				}
				JSObject obj = evt.getTimeStamp();
			}
		});
		win.addEventListener("keyup", keyup = new EventListener<KeyboardEvent>() {
			@Override
			public void handleEvent(KeyboardEvent evt) {
				if (!ClientMain.integratedServerCrashPanelShowing) {
					evt.preventDefault();
					evt.stopPropagation();
				}
				LegacyKeycodeTranslator.LegacyKeycode keyCode = null;
				if (keyCodeTranslatorMap != null && hasCodeVar(evt)) {
					keyCode = keyCodeTranslatorMap.get(evt.getCode());
				}
				int w;
				int loc;
				if (keyCode != null) {
					w = keyCode.keyCode;
					loc = keyCode.location;
				} else {
					w = getWhich(evt);
					loc = getLocationSafe(evt);
				}
				int ww = processFunctionKeys(w);
				int eag = KeyboardConstants.getEaglerKeyFromBrowser(ww, ww == w ? loc : 0);
				if (eag != 0) {
					keyStates[eag] = false;
					if (eag == functionKeyModifier) {
						for (int key = KeyboardConstants.KEY_F1; key <= KeyboardConstants.KEY_F10; ++key) {
							keyStates[key] = false;
						}
					}
				}
				String s = getCharOrNull(evt);
				int l = s.length();
				char c;
				if (l == 1) {
					c = s.charAt(0);
				} else if (l == 0) {
					c = keyToAsciiLegacy(w, evt.isShiftKey());
				} else if (s.equals("Unidentified")) {
					return;
				} else {
					c = '\0';
				}
				synchronized (keyEvents) {
					keyEvents.add(new VKeyEvent(ww, loc, eag, c, EVENT_KEY_UP));
					if (keyEvents.size() > 64) {
						keyEvents.remove(0);
					}
				}
			}
		});
		canvas.addEventListener("wheel", wheel = new EventListener<WheelEvent>() {
			@Override
			public void handleEvent(WheelEvent evt) {
				evt.preventDefault();
				evt.stopPropagation();
				double delta = -evt.getDeltaY();
				mouseDWheel += delta;
				if (hasShownPressAnyKey) {
					int eventX = (int) (getOffsetX(evt, 0) * windowDPI);
					int eventY = windowHeight - (int) (getOffsetY(evt, 0) * windowDPI) - 1;
					synchronized (mouseEvents) {
						mouseEvents.add(new VMouseEvent(eventX, eventY, -1, (float) delta, EVENT_MOUSE_WHEEL));
						if (mouseEvents.size() > 64) {
							mouseEvents.remove(0);
						}
					}
				}
			}
		});
		win.addEventListener("blur", blur = new EventListener<Event>() {
			@Override
			public void handleEvent(Event evt) {
				isWindowFocused = false;
				for (int i = 0; i < buttonStates.length; ++i) {
					buttonStates[i] = false;
				}
				for (int i = 0; i < keyStates.length; ++i) {
					keyStates[i] = false;
				}
			}
		});
		win.addEventListener("focus", focus = new EventListener<Event>() {
			@Override
			public void handleEvent(Event evt) {
				isWindowFocused = true;
			}
		});
		win.getDocument().addEventListener("visibilitychange", visibilitychange = new EventListener<Event>() {
			@Override
			public void handleEvent(Event evt) {
			}
		});

		try {
			pointerLockSupported = getSupportedPointerLock(win.getDocument());
		} catch (Throwable t) {
			pointerLockSupported = POINTER_LOCK_NONE;
		}
		if (pointerLockSupported != POINTER_LOCK_NONE) {
			win.getDocument().addEventListener(
					pointerLockSupported == POINTER_LOCK_MOZ ? "mozpointerlockchange" : "pointerlockchange",
					pointerlock = new EventListener<Event>() {
						@Override
						public void handleEvent(Event evt) {
							Window.setTimeout(new TimerHandler() {
								@Override
								public void onTimer() {
									boolean grab = isPointerLockedImpl();
									if (!grab) {
										if (pointerLockFlag) {
											mouseUngrabTimer = PlatformRuntime.steadyTimeMillis();
										}
									}
									pointerLockFlag = grab;
								}
							}, 60);
							mouseDX = 0.0D;
							mouseDY = 0.0D;
							pointerLockWaiting = false;
						}
					});
			win.getDocument().addEventListener(
					pointerLockSupported == POINTER_LOCK_MOZ ? "mozpointerlockerror" : "pointerlockerror",
					pointerlockerr = new EventListener<Event>() {
						@Override
						public void handleEvent(Event evt) {
							pointerLockWaiting = false;
						}
					});
			if (pointerLockSupported == POINTER_LOCK_MOZ) {
				PlatformRuntime.logger.info("Using moz- vendor prefix for pointer lock");
			}
		} else {
			PlatformRuntime.logger.error("Pointer lock is not supported on this browser");
		}

		if (pointerLockSupported != POINTER_LOCK_NONE) {
			String ua = PlatformRuntime.getUserAgentString();
			if (ua != null) {
				ua = ua.toLowerCase();
				isLikelyMobileBrowser = ua.contains("mobi") || ua.contains("tablet");
			} else {
				isLikelyMobileBrowser = false;
			}
		} else {
			isLikelyMobileBrowser = true;
		}

		try {
			fullscreenSupported = getSupportedFullScreen(win.getDocument());
		} catch (Throwable t) {
			fullscreenSupported = FULLSCREEN_NONE;
		}
		if (fullscreenSupported != FULLSCREEN_NONE) {
			fullscreenQuery = fullscreenMediaQuery();
			if (fullscreenSupported == FULLSCREEN_CORE && (keyboardLockSupported = checkKeyboardLockSupported())) {
				TeaVMUtils.addEventListener(fullscreenQuery, "change", fullscreen = new EventListener<Event>() {
					@Override
					public void handleEvent(Event evt) {
						if (!mediaQueryMatches(evt)) {
							unlockKeys();
							lockKeys = false;
						}
					}
				});
			}
			if (fullscreenSupported == FULLSCREEN_WEBKIT) {
				PlatformRuntime.logger.info("Using webkit- vendor prefix for fullscreen");
			} else if (fullscreenSupported == FULLSCREEN_MOZ) {
				PlatformRuntime.logger.info("Using moz- vendor prefix for fullscreen");
			}
		} else {
			PlatformRuntime.logger.error("Fullscreen is not supported on this browser");
		}

		try {
			onBeforeCloseRegister(window, () -> PlatformRuntime.beforeUnload());
		} catch (Throwable t) {
		}

		vsyncTimeout = -1;
		vsyncSupport = false;

		try {
			asyncRequestAnimationFrame();
			vsyncSupport = true;
		} catch (Throwable t) {
			PlatformRuntime.logger.error("VSync is not supported on this browser!");
		}

		finish = ((TeaVMClientConfigAdapter) PlatformRuntime.getClientConfigAdapter()).isFinishOnSwapTeaVM();
	}

	private static void handleWindowFocus() {
		if (!isWindowFocused) {
			PlatformRuntime.logger.warn(
					"Detected mouse input while the window was not focused, setting the window focused so the client doesn't pause");
			isWindowFocused = true;
		}
		isMouseOverWindow = true;
	}

	@JSFunctor
	private static interface KeyboardLayoutIterator extends JSObject {
		void call(String key, String val);
	}

	@JSFunctor
	private static interface KeyboardLayoutDone extends JSObject {
		void call();
	}

	@JSBody(params = { "cb", "cbDone" }, script = "return navigator.keyboard.getLayoutMap()"
			+ ".then(function(layoutMap) { if(layoutMap && layoutMap.forEach) layoutMap.forEach(cb); cbDone(); })"
			+ ".catch(function() { cbDone(); });")
	private static native void iterateKeyboardLayout0(KeyboardLayoutIterator cb, KeyboardLayoutDone cbDone);

	@Async
	private static native void iterateKeyboardLayout(KeyboardLayoutIterator cb);

	private static void iterateKeyboardLayout(KeyboardLayoutIterator cb, final AsyncCallback<Void> complete) {
		iterateKeyboardLayout0(cb, () -> complete.complete(null));
	}

	@JSBody(params = {}, script = "return !!(navigator.keyboard && navigator.keyboard.getLayoutMap);")
	private static native boolean checkKeyboardLayoutSupported();

	@JSBody(params = { "doc" }, script = "return (typeof doc.exitPointerLock === \"function\") ? 1"
			+ ": ((typeof doc.mozExitPointerLock === \"function\") ? 2 : -1);")
	private static native int getSupportedPointerLock(HTMLDocument doc);

	@JSBody(params = { "doc" }, script = "return (typeof doc.exitFullscreen === \"function\") ? 1"
			+ ": ((typeof doc.webkitExitFullscreen === \"function\") ? 2"
			+ ": ((typeof doc.mozExitFullscreen === \"function\") ? 3 : -1));")
	private static native int getSupportedFullScreen(HTMLDocument doc);

	@JSBody(params = { "evt" }, script = "return (typeof evt.key === \"string\");")
	private static native boolean hasKeyVar(KeyboardEvent evt);

	@JSBody(params = { "evt" }, script = "return (typeof evt.code === \"string\");")
	private static native boolean hasCodeVar(KeyboardEvent evt);

	@JSBody(params = { "evt" }, script = "return evt.keyIdentifier;")
	private static native String getKeyIdentifier(KeyboardEvent evt);

	@JSBody(params = {
			"fallback" }, script = "if(window.navigator.userActivation){return window.navigator.userActivation.hasBeenActive;}else{return fallback;}")
	public static native boolean hasBeenActiveTeaVM(boolean fallback);

	@JSBody(params = { "m", "off" }, script = "return (typeof m.offsetX === \"number\") ? m.offsetX : (m.pageX - off);")
	private static native int getOffsetX(MouseEvent m, int offX);

	@JSBody(params = { "m", "off" }, script = "return (typeof m.offsetY === \"number\") ? m.offsetY : (m.pageY - off);")
	private static native int getOffsetY(MouseEvent m, int offY);

	@JSBody(params = {
			"e" }, script = "return (typeof e.which === \"number\") ? e.which : ((typeof e.keyCode === \"number\") ? e.keyCode : 0);")
	private static native int getWhich(KeyboardEvent e);

	@JSBody(params = { "e" }, script = "return (typeof e.location === \"number\") ? e.location : 0;")
	private static native int getLocationSafe(KeyboardEvent e);

	@JSBody(params = { "el", "i", "j" }, script = "el.setSelectionRange(i, j)")
	private static native boolean setSelectionRange(HTMLElement el, int i, int j);

	public static int getWindowWidth() {
		return windowWidth;
	}

	public static int getWindowHeight() {
		return windowHeight;
	}

	public static int getVisualViewportX() {
		return visualViewportX;
	}

	public static int getVisualViewportY() {
		return visualViewportY;
	}

	public static int getVisualViewportW() {
		return visualViewportW;
	}

	public static int getVisualViewportH() {
		return visualViewportH;
	}

	public static boolean getWindowFocused() {
		return isWindowFocused || isPointerLocked();
	}

	public static boolean isCloseRequested() {
		return false;
	}

	public static void setVSync(boolean enable) {
		vsync = enable;
	}

	@JSBody(params = {
			"doc" }, script = "return (typeof doc.visibilityState !== \"string\") || (doc.visibilityState === \"visible\");")
	static native boolean getVisibilityState(JSObject doc);

	@JSBody(params = {
			"win" }, script = "return (typeof win.devicePixelRatio === \"number\") ? win.devicePixelRatio : 1.0;")
	static native double getDevicePixelRatio(Window win);

	public static void update() {
		update(0);
	}

	private static double syncTimer = 0.0;

	public static void update(int fpsLimit) {
		double r = getDevicePixelRatio(win);
		if (r < 0.01)
			r = 1.0;
		windowDPI = (float) r;
		int w = parent.getClientWidth();
		int h = parent.getClientHeight();
		int w2 = windowWidth = (int) (w * r);
		int h2 = windowHeight = (int) (h * r);
		if (PlatformRuntime.useVisualViewport) {
			VisualViewport vv = PlatformRuntime.getVisualViewport();
			double scale = vv.getScale();
			visualViewportX = (int) (vv.getPageLeft() * r * scale);
			visualViewportY = (int) (vv.getPageTop() * r * scale);
			visualViewportW = (int) (vv.getWidth() * r * scale);
			visualViewportH = (int) (vv.getHeight() * r * scale);
			if (visualViewportW < 1)
				visualViewportW = 1;
			if (visualViewportH < 1)
				visualViewportH = 1;
			if (visualViewportX < 0) {
				visualViewportW += visualViewportX;
				visualViewportX = 0;
			} else if (visualViewportX >= windowWidth) {
				visualViewportX = windowWidth - 1;
			}
			if (visualViewportY < 0) {
				visualViewportH += visualViewportY;
				visualViewportY = 0;
			} else if (visualViewportY >= windowHeight) {
				visualViewportY = windowHeight - 1;
			}
			if ((visualViewportX + visualViewportW) > windowWidth) {
				visualViewportW = windowWidth - visualViewportX;
			}
			if ((visualViewportY + visualViewportH) > windowHeight) {
				visualViewportH = windowHeight - visualViewportY;
			}
		} else {
			visualViewportX = 0;
			visualViewportY = 0;
			visualViewportW = w2;
			visualViewportH = h2;
		}
		if (canvas.getWidth() != w2) {
			canvas.setWidth(w2);
		}
		if (canvas.getHeight() != h2) {
			canvas.setHeight(h2);
		}
		WebGLBackBuffer.flipBuffer(w2, h2);
		if (getVisibilityState(win.getDocument())) {
			if (vsyncSupport && vsync) {
				syncTimer = 0.0;
				asyncRequestAnimationFrame();
			} else {
				if (finish) {
					PlatformOpenGL.ctx.finish();
				}
				if (fpsLimit <= 0 || fpsLimit > 1000) {
					syncTimer = 0.0;
					PlatformRuntime.swapDelayTeaVM();
				} else {
					double frameMillis = (1000.0 / fpsLimit);
					if (syncTimer == 0.0) {
						syncTimer = PlatformRuntime.steadyTimeMillisTeaVM() + frameMillis;
						PlatformRuntime.swapDelayTeaVM();
					} else {
						double millis = PlatformRuntime.steadyTimeMillisTeaVM();
						int remaining = (int) (syncTimer - millis);
						if (remaining > 0) {
							if (!PlatformRuntime.useDelayOnSwap && PlatformRuntime.immediateContinueSupport) {
								PlatformRuntime.immediateContinue(); // cannot stack setTimeouts, or it will throttle
								millis = PlatformRuntime.steadyTimeMillisTeaVM();
								remaining = (int) (syncTimer - millis);
								if (remaining > 0) {
									PlatformRuntime.sleep((int) remaining);
								}
							} else {
								PlatformRuntime.sleep((int) remaining);
							}
						} else {
							PlatformRuntime.swapDelayTeaVM();
						}
						millis = PlatformRuntime.steadyTimeMillisTeaVM();
						if ((syncTimer += frameMillis) < millis) {
							syncTimer = millis;
						}
					}
				}
			}
		} else {
			syncTimer = 0.0;
			PlatformRuntime.sleep(50);
		}
	}

	@Async
	private static native void asyncRequestAnimationFrame();

	private static void asyncRequestAnimationFrame(AsyncCallback<Void> cb) {
		if (vsyncTimeout != -1) {
			cb.error(new IllegalStateException("Already waiting for vsync!"));
			return;
		}
		final boolean[] hasTimedOut = new boolean[] { false };
		final int[] timeout = new int[] { -1 };
		Window.requestAnimationFrame((d) -> {
			if (!hasTimedOut[0]) {
				hasTimedOut[0] = true;
				if (vsyncTimeout != -1) {
					Window.clearTimeout(vsyncTimeout);
					vsyncTimeout = -1;
				}
				cb.complete(null);
			}
		});
		vsyncTimeout = timeout[0] = Window.setTimeout(() -> {
			if (!hasTimedOut[0]) {
				hasTimedOut[0] = true;
				if (vsyncTimeout != -1) {
					vsyncTimeout = -1;
					cb.complete(null);
				}
			}
		}, 50);
	}

	public static boolean isVSyncSupported() {
		return vsyncSupport;
	}

	public static boolean wasResized() {
		if (windowWidth != lastWasResizedWindowWidth || windowHeight != lastWasResizedWindowHeight
				|| windowDPI != lastWasResizedWindowDPI) {
			lastWasResizedWindowWidth = windowWidth;
			lastWasResizedWindowHeight = windowHeight;
			lastWasResizedWindowDPI = windowDPI;
			return true;
		} else {
			return false;
		}
	}

	public static boolean wasVisualViewportResized() {
		if (visualViewportX != lastWasResizedVisualViewportX || visualViewportY != lastWasResizedVisualViewportY
				|| visualViewportW != lastWasResizedVisualViewportW
				|| visualViewportH != lastWasResizedVisualViewportH) {
			lastWasResizedVisualViewportX = visualViewportX;
			lastWasResizedVisualViewportY = visualViewportY;
			lastWasResizedVisualViewportW = visualViewportW;
			lastWasResizedVisualViewportH = visualViewportH;
			return true;
		} else {
			return false;
		}
	}

	public static boolean keyboardNext() {
		synchronized (keyEvents) {
			if (unpressCTRL) { // un-press ctrl after copy/paste permission
				keyEvents.clear();
				currentEventK = null;
				keyStates[29] = false;
				keyStates[157] = false;
				keyStates[28] = false;
				keyStates[219] = false;
				keyStates[220] = false;
				unpressCTRL = false;
				return false;
			}
			currentEventK = null;
			return !keyEvents.isEmpty() && (currentEventK = keyEvents.remove(0)) != null;
		}
	}

	public static boolean keyboardGetEventKeyState() {
		return currentEventK == null ? false : (currentEventK.type != EVENT_KEY_UP);
	}

	public static int keyboardGetEventKey() {
		return currentEventK == null ? -1 : currentEventK.eagKey;
	}

	@JSBody(params = { "evt" }, script = "return (typeof evt.key === \"string\") ? evt.key : \"\";")
	private static native String getCharOrNull(KeyboardEvent evt);

	private static char keyToAsciiLegacy(int whichIn, boolean shiftUp) {
		switch (whichIn) {
		case 188:
			whichIn = 44;
			break;
		case 109:
			whichIn = 45;
			break;
		case 190:
			whichIn = 46;
			break;
		case 191:
			whichIn = 47;
			break;
		case 192:
			whichIn = 96;
			break;
		case 220:
			whichIn = 92;
			break;
		case 222:
			whichIn = 39;
			break;
		case 221:
			whichIn = 93;
			break;
		case 219:
			whichIn = 91;
			break;
		case 173:
			whichIn = 45;
			break;
		case 187:
			whichIn = 61;
			break;
		case 186:
			whichIn = 59;
			break;
		case 189:
			whichIn = 45;
			break;
		default:
			break;
		}
		if (shiftUp) {
			switch (whichIn) {
			case 96:
				return '~';
			case 49:
				return '!';
			case 50:
				return '@';
			case 51:
				return '#';
			case 52:
				return '$';
			case 53:
				return '%';
			case 54:
				return '^';
			case 55:
				return '&';
			case 56:
				return '*';
			case 57:
				return '(';
			case 48:
				return ')';
			case 45:
				return '_';
			case 61:
				return '+';
			case 91:
				return '{';
			case 93:
				return '}';
			case 92:
				return '|';
			case 59:
				return ':';
			case 39:
				return '\"';
			case 44:
				return '<';
			case 46:
				return '>';
			case 47:
				return '?';
			default:
				return (char) whichIn;
			}
		} else {
			if (whichIn >= 65 && whichIn <= 90) {
				return (char) (whichIn + 32);
			} else {
				return (char) whichIn;
			}
		}
	}

	private static int asciiUpperToKeyLegacy(char charIn) {
		switch (charIn) {
		case '\n':
			return 17;
		case '~':
			return 192;
		case '!':
			return 49;
		case '@':
			return 50;
		case '#':
			return 51;
		case '$':
			return 52;
		case '%':
			return 53;
		case '^':
			return 54;
		case '&':
			return 55;
		case '*':
			return 56;
		case '(':
			return 57;
		case ')':
			return 48;
		case '_':
			return 173;
		case '+':
			return 187;
		case '{':
			return 219;
		case '}':
			return 221;
		case '|':
			return 220;
		case ':':
			return 186;
		case '\"':
			return 222;
		case '<':
			return 188;
		case '>':
			return 190;
		case '?':
			return 191;
		case '.':
			return 190;
		case '\'':
			return 222;
		case ';':
			return 186;
		case '[':
			return 219;
		case ']':
			return 221;
		case ',':
			return 188;
		case '/':
			return 191;
		case '\\':
			return 220;
		case '-':
			return 189;
		case '`':
			return 192;
		default:
			return (int) charIn;
		}
	}

	public static char keyboardGetEventCharacter() {
		return currentEventK == null ? '\0' : currentEventK.keyChar;
	}

	public static boolean keyboardIsKeyDown(int key) {
		if (unpressCTRL) { // un-press ctrl after copy/paste permission
			keyStates[28] = false;
			keyStates[29] = false;
			keyStates[157] = false;
			keyStates[219] = false;
			keyStates[220] = false;
		}
		return key < 0 || key >= keyStates.length ? false : keyStates[key];
	}

	public static boolean keyboardIsRepeatEvent() {
		return currentEventK == null ? false : (currentEventK.type == EVENT_KEY_REPEAT);
	}

	public static void keyboardEnableRepeatEvents(boolean b) {
		enableRepeatEvents = b;
	}

	public static boolean keyboardAreKeysLocked() {
		return lockKeys;
	}

	public static boolean mouseNext() {
		currentEvent = null;
		synchronized (mouseEvents) {
			return !mouseEvents.isEmpty() && (currentEvent = mouseEvents.remove(0)) != null;
		}
	}

	public static boolean mouseGetEventButtonState() {
		return currentEvent == null ? false : (currentEvent.type == EVENT_MOUSE_DOWN);
	}

	public static int mouseGetEventButton() {
		if (currentEvent == null || (currentEvent.type == EVENT_MOUSE_MOVE))
			return -1;
		return currentEvent.button;
	}

	public static int mouseGetEventX() {
		return currentEvent == null ? -1 : currentEvent.posX;
	}

	public static int mouseGetEventY() {
		return currentEvent == null ? -1 : currentEvent.posY;
	}

	public static int mouseGetEventDWheel() {
		return (currentEvent.type == EVENT_MOUSE_WHEEL) ? fixWheel(currentEvent.wheel) : 0;
	}

	private static int fixWheel(float val) {
		return (val > 0.0f ? 1 : (val < 0.0f ? -1 : 0));
	}

	public static int mouseGetX() {
		return mouseX;
	}

	public static int mouseGetY() {
		return mouseY;
	}

	public static boolean mouseIsButtonDown(int i) {
		return (i < 0 || i >= buttonStates.length) ? false : buttonStates[i];
	}

	public static int mouseGetDWheel() {
		int ret = (int) mouseDWheel;
		mouseDWheel -= ret;
		return ret;
	}

	public static void mouseSetGrabbed(boolean grab) {
		if (pointerLockSupported == POINTER_LOCK_NONE) {
			return;
		}
		long t = PlatformRuntime.steadyTimeMillis();
		pointerLockFlag = grab;
		mouseGrabTimer = t;
		if (grab) {
			pointerLockWaiting = true;
			callRequestPointerLock(canvas);
			if (mouseUngrabTimeout != -1)
				Window.clearTimeout(mouseUngrabTimeout);
			mouseUngrabTimeout = -1;
			if (t - mouseUngrabTimer < 3000l) {
				mouseUngrabTimeout = Window.setTimeout(new TimerHandler() {
					@Override
					public void onTimer() {
						callRequestPointerLock(canvas);
					}
				}, 3100 - (int) (t - mouseUngrabTimer));
			}
		} else {
			if (mouseUngrabTimeout != -1)
				Window.clearTimeout(mouseUngrabTimeout);
			mouseUngrabTimeout = -1;
			if (!pointerLockWaiting) {
				callExitPointerLock(win.getDocument());
			}
		}
		mouseDX = 0.0D;
		mouseDY = 0.0D;
	}

	private static boolean tryGrabCursorHook() {
		if (pointerLockSupported == POINTER_LOCK_NONE) {
			return false;
		}
		if (pointerLockFlag && !isPointerLocked()) {
			mouseSetGrabbed(true);
			return true;
		}
		return false;
	}

	private static void callRequestPointerLock(HTMLElement el) {
		switch (pointerLockSupported) {
		case POINTER_LOCK_CORE:
			try {
				el.requestPointerLock();
			} catch (Throwable t) {
			}
			break;
		case POINTER_LOCK_MOZ:
			try {
				mozRequestPointerLock(el);
			} catch (Throwable t) {
			}
			break;
		default:
			PlatformRuntime.logger.warn("Failed to request pointer lock, it is not supported!");
			break;
		}
	}

	@JSBody(params = { "el" }, script = "el.mozRequestPointerLock();")
	private static native void mozRequestPointerLock(HTMLElement el);

	private static void callExitPointerLock(HTMLDocument doc) {
		switch (pointerLockSupported) {
		case POINTER_LOCK_CORE:
			try {
				doc.exitPointerLock();
			} catch (Throwable t) {
			}
			break;
		case POINTER_LOCK_MOZ:
			try {
				mozExitPointerLock(doc);
			} catch (Throwable t) {
			}
			break;
		default:
			PlatformRuntime.logger.warn("Failed to exit pointer lock, it is not supported!");
			break;
		}
	}

	@JSBody(params = { "doc" }, script = "doc.mozExitPointerLock();")
	private static native void mozExitPointerLock(HTMLDocument el);

	public static boolean mouseGrabSupported() {
		return pointerLockSupported != POINTER_LOCK_NONE;
	}

	public static boolean isMouseGrabbed() {
		return pointerLockFlag;
	}

	public static boolean isPointerLocked() {
		if (pointerLockWaiting)
			return true; // workaround for chrome bug
		return isPointerLockedImpl();
	}

	private static boolean isPointerLockedImpl() {
		switch (pointerLockSupported) {
		case POINTER_LOCK_CORE:
			return isPointerLocked0(win.getDocument(), canvas);
		case POINTER_LOCK_MOZ:
			return isMozPointerLocked0(win.getDocument(), canvas);
		default:
			return false;
		}
	}

	@JSBody(params = { "doc", "canvasEl" }, script = "return doc.pointerLockElement === canvasEl;")
	private static native boolean isPointerLocked0(HTMLDocument doc, HTMLCanvasElement canvasEl);

	@JSBody(params = { "doc", "canvasEl" }, script = "return doc.mozPointerLockElement === canvasEl;")
	private static native boolean isMozPointerLocked0(HTMLDocument doc, HTMLCanvasElement canvasEl);

	public static int mouseGetDX() {
		int ret = (int) mouseDX;
		mouseDX = 0.0D;
		return ret;
	}

	public static int mouseGetDY() {
		int ret = (int) mouseDY;
		mouseDY = 0.0D;
		return ret;
	}

	public static void mouseSetCursorPosition(int x, int y) {
		// obsolete
	}

	public static boolean mouseIsInsideWindow() {
		return isMouseOverWindow;
	}

	public static boolean contextLost() {
		return PlatformRuntime.webgl.isContextLost();
	}

	private static int processFunctionKeys(int key) {
		if (keyboardIsKeyDown(functionKeyModifier)) {
			if (key >= 49 && key <= 57) {
				key = key - 49 + 112;
			}
		}
		return key;
	}

	public static void setFunctionKeyModifier(int key) {
		functionKeyModifier = key;
	}

	public static void removeEventHandlers() {
		if (contextmenu != null) {
			parent.removeEventListener("contextmenu", contextmenu);
			contextmenu = null;
		}
		if (mousedown != null) {
			canvas.removeEventListener("mousedown", mousedown);
			mousedown = null;
		}
		if (mouseup != null) {
			canvas.removeEventListener("mouseup", mouseup);
			mouseup = null;
		}
		if (mousemove != null) {
			canvas.removeEventListener("mousemove", mousemove);
			mousemove = null;
		}
		if (mouseenter != null) {
			canvas.removeEventListener("mouseenter", mouseenter);
			mouseenter = null;
		}
		if (mouseleave != null) {
			canvas.removeEventListener("mouseleave", mouseleave);
			mouseleave = null;
		}
		if (keydown != null) {
			win.removeEventListener("keydown", keydown);
			keydown = null;
		}
		if (keyup != null) {
			win.removeEventListener("keyup", keyup);
			keyup = null;
		}
		if (focus != null) {
			win.removeEventListener("focus", focus);
			focus = null;
		}
		if (blur != null) {
			win.removeEventListener("blur", blur);
			blur = null;
		}
		if (visibilitychange != null) {
			win.getDocument().removeEventListener("visibilitychange", blur);
			visibilitychange = null;
		}
		if (wheel != null) {
			canvas.removeEventListener("wheel", wheel);
			wheel = null;
		}
		if (pointerlock != null) {
			win.getDocument().removeEventListener("pointerlockchange", pointerlock);
			pointerlock = null;
		}
		if (pointerlockerr != null) {
			win.getDocument().removeEventListener("pointerlockerror", pointerlockerr);
			pointerlockerr = null;
		}
		if (fullscreen != null) {
			TeaVMUtils.removeEventListener(fullscreenQuery, "change", fullscreen);
			fullscreen = null;
		}
		if (mouseUngrabTimeout != -1) {
			Window.clearTimeout(mouseUngrabTimeout);
			mouseUngrabTimeout = -1;
		}
		try {
			callExitPointerLock(win.getDocument());
		} catch (Throwable t) {
		}
		ClientMain.removeErrorHandler(win);
	}

	public static void pressAnyKeyScreen() {
		IClientConfigAdapter cfgAdapter = PlatformRuntime.getClientConfigAdapter();
		if (isLikelyMobileBrowser) {
			EarlyLoadScreen.paintEnable(PlatformOpenGL.checkVAOCapable());
			try {
				isOnMobilePressAnyKey = true;
				setupAnyKeyScreenMobile();
			} finally {
				isOnMobilePressAnyKey = false;
			}
		} else {
			if (mouseEvents.isEmpty() && keyEvents.isEmpty() && !hasBeenActiveTeaVM(false)) {
				EarlyLoadScreen.paintEnable(PlatformOpenGL.checkVAOCapable());

				while (mouseEvents.isEmpty() && keyEvents.isEmpty()) {
					PlatformRuntime.sleep(100);
				}
			}
		}
		hasShownPressAnyKey = true;
	}

	private static void setupAnyKeyScreenMobile() {
		if (mobilePressAnyKeyScreen != null) {
			parent.removeChild(mobilePressAnyKeyScreen);
		}
		mobilePressAnyKeyScreen = win.getDocument().createElement("div");
		mobilePressAnyKeyScreen.getClassList().add("_eaglercraftX_mobile_press_any_key");
		mobilePressAnyKeyScreen.setAttribute("style",
				"position:absolute;background-color:white;font-family:sans-serif;top:10%;left:10%;right:10%;bottom:10%;border:5px double black;padding:calc(5px + 7vh) 15px;text-align:center;font-size:20px;user-select:none;z-index:10;");
		mobilePressAnyKeyScreen.setInnerHTML(
				"<h3 style=\"margin-block-start:0px;margin-block-end:0px;-webkit-margin-before:0px;-webkit-margin-after:0px;margin:20px 5px;\">Mobile Browser Detected</h3>"
						+ "<p style=\"margin-block-start:0px;margin-block-end:0px;-webkit-margin-before:0px;-webkit-margin-after:0px;margin:20px 5px;\">You must manually select an option below to continue</p>"
						+ "<p style=\"margin-block-start:0px;margin-block-end:0px;-webkit-margin-before:0px;-webkit-margin-after:0px;margin:20px 2px;\"><button style=\"font: 24px sans-serif;font-weight:bold;\" class=\"_eaglercraftX_mobile_launch_client\">Launch EaglercraftX</button></p>"
						+ "<p style=\"margin-block-start:0px;margin-block-end:0px;-webkit-margin-before:0px;-webkit-margin-after:0px;margin:25px 5px;\">(Tablets and phones with large screens work best)</p>");
		mobilePressAnyKeyScreen.querySelector("._eaglercraftX_mobile_launch_client").addEventListener("click",
				new EventListener<Event>() {
					@Override
					public void handleEvent(Event evt) {
						if (isOnMobilePressAnyKey && mobilePressAnyKey != null) {
							mobilePressAnyKey.call();
						}
					}
				});
		parent.appendChild(mobilePressAnyKeyScreen);
	}

	@Async
	private static native boolean pressAnyKeyScreenMobile();

	private static void pressAnyKeyScreenMobile(final AsyncCallback<Boolean> complete) {
		mobilePressAnyKey = new MobilePressAnyKeyHandler() {
			@Override
			public void call() {
				mobilePressAnyKey = null;
				if (mobilePressAnyKeyScreen != null && parent != null) {
					parent.removeChild(mobilePressAnyKeyScreen);
				}
				mobilePressAnyKeyScreen = null;
				complete.complete(false);
			}
		};
		PlatformRuntime.logger.info("Waiting for user to select option on mobile press any key screen");
	}

	public static void clearEventBuffers() {
		mouseEvents.clear();
		keyEvents.clear();
	}

	@JSBody(params = {}, script = "return window.matchMedia(\"(display-mode: fullscreen)\");")
	private static native JSObject fullscreenMediaQuery();

	@JSBody(params = { "mediaQuery" }, script = "return mediaQuery.matches;")
	private static native boolean mediaQueryMatches(JSObject mediaQuery);

	public static boolean supportsFullscreen() {
		return fullscreenSupported != FULLSCREEN_NONE;
	}

	public static void toggleFullscreen() {
		if (fullscreenSupported == FULLSCREEN_NONE)
			return;
		if (isFullscreen()) {
			if (keyboardLockSupported) {
				unlockKeys();
				lockKeys = false;
			}
			callExitFullscreen(win.getDocument());
		} else {
			if (keyboardLockSupported) {
				lockKeys();
				lockKeys = true;
			}
			callRequestFullscreen(canvas);
		}
	}

	public static boolean isFullscreen() {
		return fullscreenSupported != FULLSCREEN_NONE && mediaQueryMatches(fullscreenQuery);
	}

	@JSBody(params = {}, script = "navigator.keyboard.lock();")
	private static native void lockKeys();

	@JSBody(params = {}, script = "navigator.keyboard.unlock();")
	private static native void unlockKeys();

	@JSBody(params = {}, script = "return !!(navigator.keyboard && navigator.keyboard.lock);")
	private static native boolean checkKeyboardLockSupported();

	private static void callRequestFullscreen(HTMLElement el) {
		switch (fullscreenSupported) {
		case FULLSCREEN_CORE:
			try {
				requestFullscreen(el);
			} catch (Throwable t) {
			}
			break;
		case FULLSCREEN_WEBKIT:
			try {
				webkitRequestFullscreen(el);
			} catch (Throwable t) {
			}
			break;
		case FULLSCREEN_MOZ:
			try {
				mozRequestFullscreen(el);
			} catch (Throwable t) {
			}
			break;
		default:
			PlatformRuntime.logger.warn("Failed to request fullscreen, it is not supported!");
			break;
		}
	}

	@JSBody(params = { "el" }, script = "el.requestFullscreen();")
	private static native void requestFullscreen(HTMLElement element);

	@JSBody(params = { "el" }, script = "el.webkitRequestFullscreen();")
	private static native void webkitRequestFullscreen(HTMLElement element);

	@JSBody(params = { "el" }, script = "el.mozRequestFullScreen();")
	private static native void mozRequestFullscreen(HTMLElement element);

	private static void callExitFullscreen(HTMLDocument doc) {
		switch (fullscreenSupported) {
		case FULLSCREEN_CORE:
			try {
				exitFullscreen(doc);
			} catch (Throwable t) {
			}
			break;
		case FULLSCREEN_WEBKIT:
			try {
				webkitExitFullscreen(doc);
			} catch (Throwable t) {
			}
			break;
		case FULLSCREEN_MOZ:
			try {
				mozCancelFullscreen(doc);
			} catch (Throwable t) {
			}
			break;
		default:
			PlatformRuntime.logger.warn("Failed to exit fullscreen, it is not supported!");
			break;
		}
	}

	@JSBody(params = { "doc" }, script = "doc.exitFullscreen();")
	private static native void exitFullscreen(HTMLDocument doc);

	@JSBody(params = { "doc" }, script = "doc.webkitExitFullscreen();")
	private static native void webkitExitFullscreen(HTMLDocument doc);

	@JSBody(params = { "doc" }, script = "doc.mozCancelFullscreen();")
	private static native void mozCancelFullscreen(HTMLDocument doc);

	public static void showCursor(EnumCursorType cursor) {
		switch (cursor) {
		case DEFAULT:
		default:
			canvas.getStyle().setProperty("cursor", "default");
			break;
		case HAND:
			canvas.getStyle().setProperty("cursor", "pointer");
			break;
		case TEXT:
			canvas.getStyle().setProperty("cursor", "text");
			break;
		}
	}

	@JSBody(params = { "doc", "el" }, script = "return doc.activeElement === el;")
	private static native boolean isActiveElement(HTMLDocument doc, HTMLElement el);

	public static float getDPI() {
		return windowDPI;
	}

	@JSBody(params = { "el" }, script = "var xx = 0; var yy = 0;"
			+ "while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {" + "xx += el.offsetLeft - el.scrollLeft;"
			+ "yy += el.offsetTop - el.scrollTop;" + "el = el.offsetParent;" + "} return { left: xx, top: yy };")
	private static native TextRectangle getPositionOf(HTMLElement el);

	static void initWindowSize(int sw, int sh, float dpi) {
		windowWidth = sw;
		windowHeight = sh;
		windowDPI = dpi;
		visualViewportX = 0;
		visualViewportY = 0;
		visualViewportW = sw;
		visualViewportH = sh;
	}

}