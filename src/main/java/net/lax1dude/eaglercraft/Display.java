package net.lax1dude.eaglercraft;

import net.lax1dude.eaglercraft.internal.ContextLostError;
import net.lax1dude.eaglercraft.internal.PlatformInput;

/**
 * Copyright (c) 2022-2023 lax1dude, ayunami2000. All Rights Reserved.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 * 
 */
public class Display {

	private static long lastDPIUpdate = -250l;
	private static float cacheDPI = 1.0f;

	public static int getWidth() {
		return PlatformInput.getWindowWidth();
	}

	public static int getHeight() {
		return PlatformInput.getWindowHeight();
	}

	public static int getVisualViewportX() {
		return PlatformInput.getVisualViewportX();
	}

	public static int getVisualViewportY() {
		return PlatformInput.getVisualViewportY();
	}

	public static int getVisualViewportW() {
		return PlatformInput.getVisualViewportW();
	}

	public static int getVisualViewportH() {
		return PlatformInput.getVisualViewportH();
	}

	public static boolean isActive() {
		return PlatformInput.getWindowFocused();
	}

	public static void setTitle(String string) {

	}

	public static boolean isCloseRequested() {
		return PlatformInput.isCloseRequested();
	}

	public static void setVSync(boolean enable) {
		PlatformInput.setVSync(enable);
	}

	public static boolean isVSyncSupported() {
		return PlatformInput.isVSyncSupported();
	}

	public static void update() {
		PlatformInput.update();
	}

	public static void update(int limitFramerate) {
		PlatformInput.update(limitFramerate);
	}

	private static final long[] defaultSyncPtr = new long[1];

	public static void sync(int limitFramerate) {
		sync(limitFramerate, defaultSyncPtr);
	}

	public static boolean sync(int limitFramerate, long[] timerPtr) {
		boolean limitFPS = limitFramerate > 0 && limitFramerate < 1000;
		boolean blocked = false;

		if (limitFPS) {
			if (timerPtr[0] == 0l) {
				timerPtr[0] = EagRuntime.steadyTimeMillis();
			} else {
				long millis = EagRuntime.steadyTimeMillis();
				long frameMillis = (1000l / limitFramerate);
				long frameTime = millis - timerPtr[0];
				if (frameTime > 2000l || frameTime < 0l) {
					frameTime = frameMillis;
					timerPtr[0] = millis;
				} else {
					timerPtr[0] += frameMillis;
				}
				if (frameTime >= 0l && frameTime < frameMillis) {
					EagUtils.sleep(frameMillis - frameTime);
					blocked = true;
				}
			}
		} else {
			timerPtr[0] = 0l;
		}

		return blocked;
	}

	public static boolean contextLost() {
		return PlatformInput.contextLost();
	}

	public static boolean wasResized() {
		return PlatformInput.wasResized();
	}

	public static boolean wasVisualViewportResized() {
		return PlatformInput.wasVisualViewportResized();
	}

	public static boolean supportsFullscreen() {
		return PlatformInput.supportsFullscreen();
	}

	public static boolean isFullscreen() {
		return PlatformInput.isFullscreen();
	}

	public static void toggleFullscreen() {
		PlatformInput.toggleFullscreen();
	}

	public static float getDPI() {
		long millis = EagRuntime.steadyTimeMillis();
		if (millis - lastDPIUpdate > 250l) {
			lastDPIUpdate = millis;
			cacheDPI = PlatformInput.getDPI();
		}
		return cacheDPI;
	}

	public static void checkContextLost() {
		if(PlatformInput.contextLost()) {
			throw new ContextLostError();
		}
	}

}
