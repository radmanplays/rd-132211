package net.lax1dude.eaglercraft;

public class EaglercraftVersion {

	//////////////////////////////////////////////////////////////////////

	/// Customize these to fit your fork:

	public static final String projectForkName = "Eaglercraft 1.12";
	public static final String projectForkVersion = "u0";
	public static final String projectForkVendor = "PeytonPlayz585";

	public static final String projectForkURL = "https://github.com/Eaglercraft-1-12/1.12";

	//////////////////////////////////////////////////////////////////////

	public static final String projectOriginName = "Eaglercraft 1.12";
	public static final String projectOriginAuthor = "PeytonPlayz585";
	public static final String projectOriginVersion = "24w52b";
	public static final String projectOriginServerVersion = "u40";

	public static final String projectOriginURL = "https://github.com/Eaglercraft-1-12/1.12";

	// EPK Version Identifier

	public static final String EPKVersionIdentifier = null; // Set to null to disable EPK version check

	// Client brand identification system configuration

	public static final EaglercraftUUID clientBrandUUID = EagUtils.makeClientBrandUUID(projectForkName);

	public static final EaglercraftUUID legacyClientUUIDInSharedWorld = EagUtils
			.makeClientBrandUUIDLegacy(projectOriginName);

	// Miscellaneous variables:

	public static final String mainMenuStringA = "Minecraft 1.12";
	public static final String mainMenuStringB = projectOriginName + " " + projectOriginVersion;
	public static final String mainMenuStringC = "";
	public static final String mainMenuStringD = "Resources Copyright Mojang AB";

	public static final String mainMenuStringE = projectForkName + " " + projectForkVersion;
	public static final String mainMenuStringF = "Made by " + projectForkVendor;

	public static final long demoWorldSeed = (long) "North Carolina".hashCode();

	public static final boolean mainMenuEnableGithubButton = false;

	public static final boolean forceDemoMode = false;

	public static final String localStorageNamespace = "_eaglercraft_1.12";

}
