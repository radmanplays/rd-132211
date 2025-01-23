package org.lwjgl;

public class LWJGLUtil {
    public static final boolean DEBUG = !(System.getProperty("org.lwjgl.util.Debug") == null);

    public static final boolean CHECKS = (System.getProperty("org.lwjgl.util.NoChecks") == null);
}