package net.lax1dude.eaglercraft.internal;

public class ContextLostError extends Error {
	
	public ContextLostError() {
		super("WebGL context lost! Please refresh the page to continue");
	}

}
