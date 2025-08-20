import com.resentclient.oss.eaglercraft.build.impl.wasm
import org.teavm.gradle.api.OptimizationLevel
import org.teavm.gradle.api.WasmDebugInfoLocation
import org.teavm.gradle.api.WasmDebugInfoLevel

plugins {
	id("java")
	id("org.teavm") version "0.12.1-EAGLER-R3"

	id("com.resentclient.oss.eaglercraft.build") version "0.0.0"
}

java {
	sourceCompatibility = JavaVersion.VERSION_17
	targetCompatibility = JavaVersion.VERSION_17
}

sourceSets {
	named("main") {
		java.srcDirs(
			"../src/main/java",
			"../src/game/java",
			"../src/wasm-gc-teavm/java"
		)
	}
}

repositories {
	maven {
		name = "eagler-teavm"
		url = uri("https://eaglercraft-teavm-fork.github.io/maven/")
	}
}

dependencies {
	teavm(teavm.libs.jso)
	teavm(teavm.libs.jsoApis)
	compileOnly("org.teavm:teavm-core:0.12.1-EAGLER-R3") // workaround for a few hacks
	implementation(libs.jorbis)
	implementation(libs.bundles.common)
}

val wasmFolder = "javascript"
val wasmOutputFileName = "classes.wasm"

teavm.wasmGC {
	targetFileName = "../" + wasmOutputFileName
	optimization = OptimizationLevel.AGGRESSIVE
	outOfProcess = false
	fastGlobalAnalysis = false
	processMemory = 512
	mainClass = "net.lax1dude.eaglercraft.internal.wasm_gc_teavm.MainClass"
	outputDir = file(wasmFolder)
	properties = mapOf("java.util.TimeZone.autodetect" to "true")
	debugInformation = true
	debugInfoLocation = WasmDebugInfoLocation.EXTERNAL;
	debugInfoLevel = WasmDebugInfoLevel.DEOBFUSCATION;
	minDirectBuffersSize = 32
	maxDirectBuffersSize = 512
	disassembly = true
}

tasks.withType<JavaCompile> {
	options.encoding = "UTF-8"
}

eaglercraftBuild {
	suites {
		wasm("main") {
			val srcFolder = "../src/wasm-gc-teavm/js"

			closureCompiler = file("buildtools/closure-compiler.jar")
			closureMainClass = "com.google.javascript.jscomp.CommandLineRunner"
			closureInputFiles = files(
				"$srcFolder/externs.js",
				"$srcFolder/eagruntime_util.js",
				"$srcFolder/eagruntime_main.js",
				"$srcFolder/platformApplication.js",
				"$srcFolder/platformAssets.js",
				"$srcFolder/platformAudio.js",
				"$srcFolder/platformFilesystem.js",
				"$srcFolder/platformInput.js",
				"$srcFolder/platformNetworking.js",
				"$srcFolder/platformOpenGL.js",
				"$srcFolder/platformRuntime.js",
				"$srcFolder/WASMGCBufferAllocator.js",
				"$srcFolder/teavm_runtime.js",
				"$srcFolder/eagruntime_entrypoint.js"
			)
			runtimeOutput = file("javascript/eagruntime.js")

			epwSource = file("$wasmFolder/epw_src.txt")
			epwMeta = file("$wasmFolder/epw_meta.txt")
			epwSearchDirectory = file(wasmFolder)
			clientBundleOutputDir = file("javascript_dist")
		}.apply {
			epkSources = file("../desktopRuntime/resources")
			epkOutput = file("javascript/assets.epk")

			languageMetadataInput = file("../target_teavm_javascript/javascript/lang")
			languageEpkOutput = file("javascript/lang.tmp.epk")

			sourceGeneratorTaskName = "generateWasmGC"
		}
	}
}