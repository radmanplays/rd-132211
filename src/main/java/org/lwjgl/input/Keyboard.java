package org.lwjgl.input;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

import org.lwjgl.LWJGLException;
import org.teavm.jso.JSBody;
import org.teavm.jso.dom.events.EventListener;
import org.teavm.jso.dom.events.KeyboardEvent;

import main.WebGL;

public class Keyboard {
	
	private static String[] keys = new String[] {"NONE", "ESCAPE", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "MINUS", "EQUALS", "BACK", "TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "LBRACKET", "RBRACKET", "RETURN", "LCONTROL", "A", "S", "D", "F", "G", "H", "J", "K", "L", "SEMICOLON", "APOSTROPHE", "GRAVE", "LSHIFT", "BACKSLASH", "Z", "X", "C", "V", "B", "N", "M", "COMMA", "PERIOD", "SLASH", "RSHIFT", "MULTIPLY", "LMENU", "SPACE", "CAPITAL", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "NUMLOCK", "SCROLL", "NUMPAD7", "NUMPAD8", "NUMPAD9", "SUBTRACT", "NUMPAD4", "NUMPAD5", "NUMPAD6", "ADD", "NUMPAD1", "NUMPAD2", "NUMPAD3", "NUMPAD0", "DECIMAL", "", "", "", "F11", "F12", "", "", "", "", "", "", "", "", "", "", "", "F13", "F14", "F15", "F16", "F17", "F18", "", "", "", "", "", "", "KANA", "F19", "", "", "", "", "", "", "", "CONVERT", "", "NOCONVERT", "", "YEN", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "NUMPADEQUALS", "", "", "CIRCUMFLEX", "AT", "COLON", "UNDERLINE", "KANJI", "STOP", "AX", "UNLABELED", "", "", "", "", "NUMPADENTER", "RCONTROL", "", "", "", "", "", "", "", "", "", "SECTION", "", "", "", "", "", "", "", "", "", "", "", "NUMPADCOMMA", "", "DIVIDE", "", "SYSRQ", "RMENU", "", "", "", "", "", "", "", "", "", "", "", "FUNCTION", "PAUSE", "", "HOME", "UP", "PRIOR", "", "LEFT", "", "RIGHT", "", "END", "DOWN", "NEXT", "INSERT", "DELETE", "", "", "", "", "", "", "CLEAR", "LMETA", "RMETA", "APPS", "POWER", "SLEEP"};
	
	public static final int KEY_NONE            = 0x00;

	public static final int KEY_ESCAPE          = 0x01;
	public static final int KEY_1               = 0x02;
	public static final int KEY_2               = 0x03;
	public static final int KEY_3               = 0x04;
	public static final int KEY_4               = 0x05;
	public static final int KEY_5               = 0x06;
	public static final int KEY_6               = 0x07;
	public static final int KEY_7               = 0x08;
	public static final int KEY_8               = 0x09;
	public static final int KEY_9               = 0x0A;
	public static final int KEY_0               = 0x0B;
	public static final int KEY_MINUS           = 0x0C;
	public static final int KEY_EQUALS          = 0x0D;
	public static final int KEY_BACK            = 0x0E;
	public static final int KEY_TAB             = 0x0F;
	public static final int KEY_Q               = 0x10;
	public static final int KEY_W               = 0x11;
	public static final int KEY_E               = 0x12;
	public static final int KEY_R               = 0x13;
	public static final int KEY_T               = 0x14;
	public static final int KEY_Y               = 0x15;
	public static final int KEY_U               = 0x16;
	public static final int KEY_I               = 0x17;
	public static final int KEY_O               = 0x18;
	public static final int KEY_P               = 0x19;
	public static final int KEY_LBRACKET        = 0x1A;
	public static final int KEY_RBRACKET        = 0x1B;
	public static final int KEY_RETURN          = 0x1C;
	public static final int KEY_LCONTROL        = 0x1D;
	public static final int KEY_A               = 0x1E;
	public static final int KEY_S               = 0x1F;
	public static final int KEY_D               = 0x20;
	public static final int KEY_F               = 0x21;
	public static final int KEY_G               = 0x22;
	public static final int KEY_H               = 0x23;
	public static final int KEY_J               = 0x24;
	public static final int KEY_K               = 0x25;
	public static final int KEY_L               = 0x26;
	public static final int KEY_SEMICOLON       = 0x27;
	public static final int KEY_APOSTROPHE      = 0x28;
	public static final int KEY_GRAVE           = 0x29;
	public static final int KEY_LSHIFT          = 0x2A;
	public static final int KEY_BACKSLASH       = 0x2B;
	public static final int KEY_Z               = 0x2C;
	public static final int KEY_X               = 0x2D;
	public static final int KEY_C               = 0x2E;
	public static final int KEY_V               = 0x2F;
	public static final int KEY_B               = 0x30;
	public static final int KEY_N               = 0x31;
	public static final int KEY_M               = 0x32;
	public static final int KEY_COMMA           = 0x33;
	public static final int KEY_PERIOD          = 0x34;
	public static final int KEY_SLASH           = 0x35;
	public static final int KEY_RSHIFT          = 0x36;
	public static final int KEY_MULTIPLY        = 0x37;
	public static final int KEY_LMENU           = 0x38;
	public static final int KEY_SPACE           = 0x39;
	public static final int KEY_CAPITAL         = 0x3A;
	//public static final int KEY_F1              = 0x3B;
	//public static final int KEY_F2              = 0x3C;
	//public static final int KEY_F3              = 0x3D;
	//public static final int KEY_F4              = 0x3E;
	//public static final int KEY_F5              = 0x3F;
	//public static final int KEY_F6              = 0x40;
	//public static final int KEY_F7              = 0x41;
	//public static final int KEY_F8              = 0x42;
	//public static final int KEY_F9              = 0x43;
	public static final int KEY_NUMPAD7         = 0x47;
	public static final int KEY_NUMPAD8         = 0x48;
	public static final int KEY_NUMPAD9         = 0x49;
	public static final int KEY_SUBTRACT        = 0x4A;
	public static final int KEY_NUMPAD4         = 0x4B;
	public static final int KEY_NUMPAD5         = 0x4C;
	public static final int KEY_NUMPAD6         = 0x4D;
	public static final int KEY_ADD             = 0x4E;
	public static final int KEY_NUMPAD1         = 0x4F;
	public static final int KEY_NUMPAD2         = 0x50;
	public static final int KEY_NUMPAD3         = 0x51;
	public static final int KEY_NUMPAD0         = 0x52;
	public static final int KEY_DECIMAL         = 0x53;
	public static final int KEY_KANA            = 0x70;
	public static final int KEY_F19             = 0x71;
	public static final int KEY_CONVERT         = 0x79;
	public static final int KEY_NOCONVERT       = 0x7B;
	public static final int KEY_YEN             = 0x7D;
	public static final int KEY_NUMPADEQUALS    = 0x8D;
	public static final int KEY_CIRCUMFLEX      = 0x90;
	public static final int KEY_AT              = 0x91;
	public static final int KEY_COLON           = 0x92;
	public static final int KEY_UNDERLINE       = 0x93;
	public static final int KEY_KANJI           = 0x94;
	public static final int KEY_STOP            = 0x95;
	public static final int KEY_AX              = 0x96;
	public static final int KEY_UNLABELED       = 0x97;
	public static final int KEY_NUMPADENTER     = 0x9C;
	public static final int KEY_RCONTROL        = 0x9D;
	public static final int KEY_SECTION         = 0xA7;
	public static final int KEY_NUMPADCOMMA     = 0xB3;
	public static final int KEY_DIVIDE          = 0xB5;
	public static final int KEY_SYSRQ           = 0xB7;
	public static final int KEY_RMENU           = 0xB8;
	public static final int KEY_UP              = 0xC8;
	public static final int KEY_PRIOR           = 0xC9;
	public static final int KEY_LEFT            = 0xCB;
	public static final int KEY_RIGHT           = 0xCD;
	public static final int KEY_END             = 0xCF;
	public static final int KEY_DOWN            = 0xD0;
	public static final int KEY_NEXT            = 0xD1;
	public static final int KEY_INSERT          = 0xD2;
	public static final int KEY_DELETE          = 0xD3;
	public static final int KEY_CLEAR           = 0xDA;

	public static final int KEYBOARD_SIZE = 256;

	private static final int BUFFER_SIZE = 50;

	private static final String[] keyName = new String[KEYBOARD_SIZE];
	private static final Map<String, Integer> keyMap = new HashMap<String, Integer>(253);
	private static int counter;
	
	private static boolean created = false;
	
	private static boolean repeat_enabled = false;
	
	private static boolean initialized;
	
	private static LinkedList<KeyboardEvent> keyEvents = new LinkedList();
	private static boolean[] keyStates = new boolean[256];
	
	private static int keyCount = 0;
	
	private Keyboard() {
	}
	
	private static void initialize() {
		if(initialized) {
			return;
		}
		initialized = true;
	}
	
	public static void create() throws LWJGLException {
		try {
			if(created) {
				return;
			}
			if(!initialized) {
				initialize();
			}
			
			WebGL.window.addEventListener("keydown", keydown = new EventListener<KeyboardEvent>() {
				@Override
				public void handleEvent(KeyboardEvent evt) {
					keyStates[remap(getKeyWhich(evt))] = true;
					keyEvents.add(evt);
					evt.preventDefault();
					evt.stopPropagation();
				}
			});
			WebGL.window.addEventListener("keyup", keyup = new EventListener<KeyboardEvent>() {
				@Override
				public void handleEvent(KeyboardEvent evt) {
					keyStates[remap(getKeyWhich(evt))] = false;
					keyEvents.add(evt);
					evt.preventDefault();
					evt.stopPropagation();
				}
			});
			WebGL.window.addEventListener("keypress", keypress = new EventListener<KeyboardEvent>() {
				@Override
				public void handleEvent(KeyboardEvent evt) {
					if(repeat_enabled && evt.isRepeat()) keyEvents.add(evt);
					evt.preventDefault();
					evt.stopPropagation();
				}
			});
			
			created = true;
			
			if(keyEvents != null) {
				keyEvents.clear();
			}
		} catch(Throwable t) {
			throw new LWJGLException(t);
		}
	}
	
	public static boolean isCreated() {
		return created;
	}
	
	public static void destroy() {
		if(!created) {
			return;
		}
		
		created = false;
		
		WebGL.window.removeEventListener("keydown", keydown);
		WebGL.window.removeEventListener("keyup", keyup);
		WebGL.window.removeEventListener("keypress", keypress);
		keyEvents.clear();
	}
	
	public static void poll() {
	}
	
	public static boolean isKeyDown(int key) {
		return keyStates[key];
	}
	
	public static String getKeyName(int key) {
		return keyName[key];
	}
	
	public static int getKeyIndex(String keyName) {
		Integer ret = keyMap.get(keyName);
		if (ret == null) {
			return KEY_NONE;
		} else {
			return ret;
		}
	}
	
	public static int getNumKeyboardEvents() {
		return keyEvents.size();
	}
	
	public static boolean next() {
		currentEventK = null;
		return !keyEvents.isEmpty() && (currentEventK = keyEvents.remove(0)) != null;
	}
	
	public static void enableRepeatEvents(boolean enable) {
		repeat_enabled = true;
	}
	
	public static boolean areRepeatEventsEnabled() {
		return repeat_enabled;
	}
	
	public static int getKeyCount() {
		return keyCount;
	}
	
	public static char getEventCharacter() {
		if(currentEventK == null) return '\0';
		String s = currentEventK.getKey();
		return currentEventK == null ? ' ' : (char) (s.length() > 1 ? '\0' : s.charAt(0));
	}
	
	public static int getEventKey() {
		return currentEventK == null ? -1 : remap(getKeyWhich(currentEventK));
	}
	
	public static boolean getEventKeyState() {
		return currentEventK == null? false : !currentEventK.getType().equals("keyup");
	}
	
	public static boolean isRepeatEvent() {
		return currentEventK == null ? false : currentEventK.isRepeat();
	}
	
	private static EventListener keydown = null;
	private static EventListener keyup = null;
	private static EventListener keypress = null;
	private static KeyboardEvent currentEventK = null;
	
	@JSBody(params = { "e" }, script = "return e.which;")
	private static native int getKeyWhich(KeyboardEvent e);
	
	private static int remap(int k) {
		return (k > LWJGLKeyCodes.length || k < 0) ? -1 : LWJGLKeyCodes[k];
	}
	
	//From EaglerAdapter
	private static int[] LWJGLKeyCodes = new int[] {
			/* 0 */ -1,
			/* 1 */ -1,
			/* 2 */ -1,
			/* 3 */ -1,
			/* 4 */ -1,
			/* 5 */ -1,
			/* 6 */ -1,
			/* 7 */ -1,
			/* 8 */ 14,
			/* 9 */ 15,
			/* 10 */ -1,
			/* 11 */ -1,
			/* 12 */ -1,
			/* 13 */ 28,
			/* 14 */ -1,
			/* 15 */ -1,
			/* 16 */ 42,
			/* 17 */ 29,
			/* 18 */ 56,
			/* 19 */ -1,
			/* 20 */ -1,
			/* 21 */ -1,
			/* 22 */ -1,
			/* 23 */ -1,
			/* 24 */ -1,
			/* 25 */ -1,
			/* 26 */ -1,
			/* 27 */ 1,
			/* 28 */ -1,
			/* 29 */ -1,
			/* 30 */ -1,
			/* 31 */ -1,
			/* 32 */ 57,
			/* 33 */ 210,
			/* 34 */ 201,
			/* 35 */ 207,
			/* 36 */ 199,
			/* 37 */ 203,
			/* 38 */ 200,
			/* 39 */ 205,
			/* 40 */ 208,
			/* 41 */ 205,
			/* 42 */ 208,
			/* 43 */ -1,
			/* 44 */ -1,
			/* 45 */ 210,
			/* 46 */ 211,
			/* 47 */ 211,
			/* 48 */ 11,
			/* 49 */ 2,
			/* 50 */ 3,
			/* 51 */ 4,
			/* 52 */ 5,
			/* 53 */ 6,
			/* 54 */ 7,
			/* 55 */ 8,
			/* 56 */ 9,
			/* 57 */ 10,
			/* 58 */ -1,
			/* 59 */ -1,
			/* 60 */ -1,
			/* 61 */ -1,
			/* 62 */ -1,
			/* 63 */ -1,
			/* 64 */ -1,
			/* 65 */ 30,
			/* 66 */ 48,
			/* 67 */ 46,
			/* 68 */ 32,
			/* 69 */ 18,
			/* 70 */ 33,
			/* 71 */ 34,
			/* 72 */ 35,
			/* 73 */ 23,
			/* 74 */ 36,
			/* 75 */ 37,
			/* 76 */ 38,
			/* 77 */ 50,
			/* 78 */ 49,
			/* 79 */ 24,
			/* 80 */ 25,
			/* 81 */ 16,
			/* 82 */ 19,
			/* 83 */ 31,
			/* 84 */ 20,
			/* 85 */ 22,
			/* 86 */ 47,
			/* 87 */ 17,
			/* 88 */ 45,
			/* 89 */ 21,
			/* 90 */ 44,
			/* 91 */ -1,
			/* 92 */ -1,
			/* 93 */ -1,
			/* 94 */ -1,
			/* 95 */ -1,
			/* 96 */ -1,
			/* 97 */ -1,
			/* 98 */ -1,
			/* 99 */ -1,
			/* 100 */ -1,
			/* 101 */ -1,
			/* 102 */ -1,
			/* 103 */ -1,
			/* 104 */ -1,
			/* 105 */ -1,
			/* 106 */ -1,
			/* 107 */ -1,
			/* 108 */ -1,
			/* 109 */ 12,
			/* 110 */ 52,
			/* 111 */ 53,
			/* 112 */ -1,
			/* 113 */ -1,
			/* 114 */ -1,
			/* 115 */ -1,
			/* 116 */ -1,
			/* 117 */ -1,
			/* 118 */ -1,
			/* 119 */ -1,
			/* 120 */ -1,
			/* 121 */ -1,
			/* 122 */ -1,
			/* 123 */ -1,
			/* 124 */ -1,
			/* 125 */ -1,
			/* 126 */ -1,
			/* 127 */ -1,
			/* 128 */ -1,
			/* 129 */ -1,
			/* 130 */ -1,
			/* 131 */ -1,
			/* 132 */ -1,
			/* 133 */ -1,
			/* 134 */ -1,
			/* 135 */ -1,
			/* 136 */ -1,
			/* 137 */ -1,
			/* 138 */ -1,
			/* 139 */ -1,
			/* 140 */ -1,
			/* 141 */ -1,
			/* 142 */ -1,
			/* 143 */ -1,
			/* 144 */ -1,
			/* 145 */ -1,
			/* 146 */ -1,
			/* 147 */ -1,
			/* 148 */ -1,
			/* 149 */ -1,
			/* 150 */ -1,
			/* 151 */ -1,
			/* 152 */ -1,
			/* 153 */ -1,
			/* 154 */ -1,
			/* 155 */ -1,
			/* 156 */ -1,
			/* 157 */ -1,
			/* 158 */ -1,
			/* 159 */ -1,
			/* 160 */ -1,
			/* 161 */ -1,
			/* 162 */ -1,
			/* 163 */ -1,
			/* 164 */ -1,
			/* 165 */ -1,
			/* 166 */ -1,
			/* 167 */ -1,
			/* 168 */ -1,
			/* 169 */ -1,
			/* 170 */ -1,
			/* 171 */ -1,
			/* 172 */ -1,
			/* 173 */ -1,
			/* 174 */ -1,
			/* 175 */ -1,
			/* 176 */ -1,
			/* 177 */ -1,
			/* 178 */ -1,
			/* 179 */ -1,
			/* 180 */ -1,
			/* 181 */ -1,
			/* 182 */ -1,
			/* 183 */ -1,
			/* 184 */ -1,
			/* 185 */ -1,
			/* 186 */ 39,
			/* 187 */ 13,
			/* 188 */ 51,
			/* 189 */ 12,
			/* 190 */ 52,
			/* 191 */ 53,
			/* 192 */ -1,
			/* 193 */ -1,
			/* 194 */ -1,
			/* 195 */ -1,
			/* 196 */ -1,
			/* 197 */ -1,
			/* 198 */ -1,
			/* 199 */ -1,
			/* 200 */ -1,
			/* 200 */ -1,
			/* 201 */ -1,
			/* 202 */ -1,
			/* 203 */ -1,
			/* 204 */ -1,
			/* 205 */ -1,
			/* 206 */ -1,
			/* 207 */ -1,
			/* 208 */ -1,
			/* 209 */ -1,
			/* 210 */ -1,
			/* 211 */ -1,
			/* 212 */ -1,
			/* 213 */ -1,
			/* 214 */ -1,
			/* 215 */ -1,
			/* 216 */ -1,
			/* 217 */ -1,
			/* 218 */ -1,
			/* 219 */ 26,
			/* 220 */ 43,
			/* 221 */ 27,
			/* 222 */ 40
	};
	
	static {
		int keyIndex = 0; //Starts at KEY_NONE
		for(String key : keys) {
			keyName[keyIndex] = key;
			keyMap.put(key, keyIndex);
			keyIndex++;
			counter++;
		}
		
		int count = 0;
		for(Integer i : LWJGLKeyCodes) {
			if(i != -1) {
				count++;
			}
		}
		keyCount = count;
	}

}
