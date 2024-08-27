package net.PeytonPlayz585;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.lwjgl.opengl.Display;
import org.teavm.jso.JSBody;
import org.teavm.jso.browser.Window;
import org.teavm.jso.core.JSError;
import org.teavm.jso.dom.html.HTMLElement;

import net.PeytonPlayz585.opengl.LWJGLMain;
import net.minecraft.src.Minecraft;
import net.minecraft.src.Session;

public class Client {
	
	public static HTMLElement rootElement = null;
	public static Minecraft instance = null;
	private static Thread mcThread = null;
	
	@JSBody(params = { }, script = "window.minecraftError = null; window.onerror = function(message, file, line, column, errorObj) { if(errorObj) { window.minecraftError = errorObj; window.minecraftErrorL = \"\"+line+\":\"+column; javaMethods.get(\"net.PeytonPlayz585.Client.handleNativeError()V\").invoke(); } else { alert(\"a native browser exception was thrown but your browser does not support fith argument in onerror\"); } };")
	public static native void registerErrorHandler();
	
	@JSBody(params = { }, script = "return window.minecraftError;")
	public static native JSError getWindowError();
	
	@JSBody(params = { }, script = "return window.minecraftErrorL;")
	public static native String getWindowErrorL();
	
	@JSBody(params = { }, script = "return window.minecraftOpts;")
	public static native String[] getOpts();
	
	public static void handleNativeError() {
		JSError e = getWindowError();
		StringBuilder str = new StringBuilder();
		str.append("Native Browser Exception\n");
		str.append("----------------------------------\n");
		str.append("  Line: ").append(getWindowErrorL()).append('\n');
		str.append("  Type: ").append(e.getName()).append('\n');
		str.append("  Message: ").append(e.getMessage()).append('\n');
		str.append("----------------------------------\n\n");
		str.append(e.getStack()).append('\n');
		System.err.println(str.toString());
	}
	
	public static void main(String args[]) {
    	String[] e = getOpts();
    	try {
	    	try {
	    		LWJGLMain.initializeContext(rootElement = Window.current().getDocument().getElementById(e[0]), e[1]);
	    	}catch(Exception ex) {
	    		return;
	    	}
    	}catch(Throwable ex2) {
    		StringWriter s = new StringWriter();
    		ex2.printStackTrace(new PrintWriter(s));
    		return;
    	}
    	//LocalStorageManager.loadStorage();
    	run0();
	}
	
	public static void run0() {
		instance = new Minecraft(Display.getWidth(), Display.getHeight(), false);
		instance.session = new Session("Player", "fuckmojang123");
		instance.session.mpPassParameter = "randpasslol";
		mcThread = new Thread(instance, "Minecraft main thread");
		mcThread.start();
	}

}
