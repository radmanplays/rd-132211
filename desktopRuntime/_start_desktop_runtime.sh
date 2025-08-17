#!/bin/sh
java -Xmx4G -Xms4G -XX:-CreateCoredumpOnCrash -Djava.library.path=. -cp "eaglercraft.jar:UnsafeMemcpy.jar:lwjgl.jar:lwjgl-egl.jar:lwjgl-glfw.jar:lwjgl-jemalloc.jar:lwjgl-openal.jar:lwjgl-opengles.jar:soundsystem-20120107.jar:codecjorbis-20101023.jar:codecwav-20101023.jar:Java-WebSocket-1.5.1-with-dependencies.jar" net.lax1dude.eaglercraft.internal.MainClass
