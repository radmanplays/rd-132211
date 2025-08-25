package net.lax1dude.eaglercraft.internal;

import java.io.File;

import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;

import com.mojang.rubydung.RubyDung;

import net.lax1dude.eaglercraft.EagRuntime;
import net.lax1dude.eaglercraft.EagUtils;

/**
 * Copyright (c) 2022-2023 lax1dude. All Rights Reserved.
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
public class LWJGLEntryPoint {

	public static Thread mainThread = null;

	public static void main_(String[] args) {
		mainThread = Thread.currentThread();

		try {
			UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
		} catch (ClassNotFoundException | InstantiationException | IllegalAccessException
				| UnsupportedLookAndFeelException e) {
			System.err.println("Could not set system look and feel: " + e.toString());
		}

		boolean hideRenderDocDialog = false;
		for (int i = 0; i < args.length; ++i) {
			if (args[i].equalsIgnoreCase("hide-renderdoc")) {
				hideRenderDocDialog = true;
			}
		}

		if (!hideRenderDocDialog) {
			LaunchRenderDocDialog lr = new LaunchRenderDocDialog();
			lr.setLocationRelativeTo(null);
			lr.setVisible(true);

			while (lr.isVisible()) {
				EagUtils.sleep(100);
			}

			lr.dispose();
		}

		getPlatformOptionsFromArgs(args);

		EagRuntime.create();

		new RubyDung().run();

	}

	private static void getPlatformOptionsFromArgs(String[] args) {
		for (int i = 0; i < args.length; ++i) {
			if (args[i].equalsIgnoreCase("fullscreen")) {
				PlatformInput.setStartupFullscreen(true);
			} else if (args[i].equalsIgnoreCase("gles=200")) {
				PlatformRuntime.requestGL(200);
			} else if (args[i].equalsIgnoreCase("gles=300")) {
				PlatformRuntime.requestGL(300);
			} else if (args[i].equalsIgnoreCase("gles=310")) {
				PlatformRuntime.requestGL(310);
			} else if (args[i].equalsIgnoreCase("disableKHRDebug")) {
				PlatformRuntime.requestDisableKHRDebug(true);
			} else {
				EnumPlatformANGLE angle = EnumPlatformANGLE.fromId(args[i]);
				if (angle != EnumPlatformANGLE.DEFAULT) {
					PlatformRuntime.requestANGLE(angle);
				}
			}
		}
	}

}