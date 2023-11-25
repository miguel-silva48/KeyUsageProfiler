package com.mibef108287.app;

import com.github.kwhat.jnativehook.keyboard.NativeKeyEvent;
import java.awt.Toolkit;

public class MyKeyEvent extends NativeKeyEvent{
  public MyKeyEvent(int id, int modifiers, int rawCode, int keyCode, char keyChar, int keyLocation) {
		super(id, modifiers, rawCode, keyCode, keyChar, keyLocation);
	}

  public static String getKeyText(int keyCode) {
		// Lookup text values.
		switch (keyCode) {
			case VC_ESCAPE:
				return Toolkit.getProperty("AWT.escape", "Escape");

			// Begin Function Keys
			case VC_F1:
				return Toolkit.getProperty("AWT.f1", "F1");
			case VC_F2:
				return Toolkit.getProperty("AWT.f2", "F2");
			case VC_F3:
				return Toolkit.getProperty("AWT.f3", "F3");
			case VC_F4:
				return Toolkit.getProperty("AWT.f4", "F4");
			case VC_F5:
				return Toolkit.getProperty("AWT.f5", "F5");
			case VC_F6:
				return Toolkit.getProperty("AWT.f6", "F6");
			case VC_F7:
				return Toolkit.getProperty("AWT.f7", "F7");
			case VC_F8:
				return Toolkit.getProperty("AWT.f8", "F8");
			case VC_F9:
				return Toolkit.getProperty("AWT.f9", "F9");
			case VC_F10:
				return Toolkit.getProperty("AWT.f10", "F10");
			case VC_F11:
				return Toolkit.getProperty("AWT.f11", "F11");
			case VC_F12:
				return Toolkit.getProperty("AWT.f12", "F12");

			case VC_F13:
				return Toolkit.getProperty("AWT.f13", "F13");
			case VC_F14:
				return Toolkit.getProperty("AWT.f14", "F14");
			case VC_F15:
				return Toolkit.getProperty("AWT.f15", "F15");
			case VC_F16:
				return Toolkit.getProperty("AWT.f16", "F16");
			case VC_F17:
				return Toolkit.getProperty("AWT.f17", "F17");
			case VC_F18:
				return Toolkit.getProperty("AWT.f18", "F18");
			case VC_F19:
				return Toolkit.getProperty("AWT.f19", "F19");
			case VC_F20:
				return Toolkit.getProperty("AWT.f20", "F20");
			case VC_F21:
				return Toolkit.getProperty("AWT.f21", "F21");
			case VC_F22:
				return Toolkit.getProperty("AWT.f22", "F22");
			case VC_F23:
				return Toolkit.getProperty("AWT.f23", "F23");
			case VC_F24:
				return Toolkit.getProperty("AWT.f24", "F24");
			// End Function Keys

			// Begin Alphanumeric Zone
			case VC_BACKQUOTE:
				return Toolkit.getProperty("AWT.backQuote", "Back Quote");

			case VC_1:
				return "1";
			case VC_2:
				return "2";
			case VC_3:
				return "3";
			case VC_4:
				return "4";
			case VC_5:
				return "5";
			case VC_6:
				return "6";
			case VC_7:
				return "7";
			case VC_8:
				return "8";
			case VC_9:
				return "9";
			case VC_0:
				return "0";

			case VC_MINUS:
				return "-";
			case VC_EQUALS:
				return "=";
			case VC_BACKSPACE:
				return Toolkit.getProperty("AWT.backSpace", "Backspace");

			case VC_TAB:
				return "\t";
			case VC_CAPS_LOCK:
				return Toolkit.getProperty("AWT.capsLock", "Caps Lock");

			case VC_A:
				return "A";
			case VC_B:
				return "B";
			case VC_C:
				return "C";
			case VC_D:
				return "D";
			case VC_E:
				return "E";
			case VC_F:
				return "F";
			case VC_G:
				return "G";
			case VC_H:
				return "H";
			case VC_I:
				return "I";
			case VC_J:
				return "J";
			case VC_K:
				return "K";
			case VC_L:
				return "L";
			case VC_M:
				return "M";
			case VC_N:
				return "N";
			case VC_O:
				return "O";
			case VC_P:
				return "P";
			case VC_Q:
				return "Q";
			case VC_R:
				return "R";
			case VC_S:
				return "S";
			case VC_T:
				return "T";
			case VC_U:
				return "U";
			case VC_V:
				return "V";
			case VC_W:
				return "W";
			case VC_X:
				return "X";
			case VC_Y:
				return "Y";
			case VC_Z:
				return "Z";

			case VC_OPEN_BRACKET:
				return "{";
			case VC_CLOSE_BRACKET:
				return "}";
			case VC_BACK_SLASH:
				return "\\";

			case VC_SEMICOLON:
				return ";";
			case VC_QUOTE:
				return "'";
			case VC_ENTER:
				return "\n";

			case VC_COMMA:
				return ",";
			case VC_PERIOD:
				return ".";
			case VC_SLASH:
				return "/";

			case VC_SPACE:
				return " ";
			// End Alphanumeric Zone

			case VC_PRINTSCREEN:
				return Toolkit.getProperty("AWT.printScreen", "Print Screen");
			case VC_SCROLL_LOCK:
				return Toolkit.getProperty("AWT.scrollLock", "Scroll Lock");
			case VC_PAUSE:
				return Toolkit.getProperty("AWT.pause", "Pause");

			// Begin Edit Key Zone
			case VC_INSERT:
				return Toolkit.getProperty("AWT.insert", "Insert");
			case VC_DELETE:
				return Toolkit.getProperty("AWT.delete", "Delete");
			case VC_HOME:
				return Toolkit.getProperty("AWT.home", "Home");
			case VC_END:
				return Toolkit.getProperty("AWT.end", "End");
			case VC_PAGE_UP:
				return Toolkit.getProperty("AWT.pgup", "Page Up");
			case VC_PAGE_DOWN:
				return Toolkit.getProperty("AWT.pgdn", "Page Down");
			// End Edit Key Zone


			// Begin Cursor Key Zone
			case VC_UP:
				return Toolkit.getProperty("AWT.up", "Up");
			case VC_LEFT:
				return Toolkit.getProperty("AWT.left", "Left");
			case VC_CLEAR:
				return Toolkit.getProperty("AWT.clear", "Clear");
			case VC_RIGHT:
				return Toolkit.getProperty("AWT.right", "Right");
			case VC_DOWN:
				return Toolkit.getProperty("AWT.down", "Down");
			// End Cursor Key Zone


			// Begin Numeric Zone
			case VC_NUM_LOCK:
				return Toolkit.getProperty("AWT.numLock", "Num Lock");
			case VC_SEPARATOR:
				return Toolkit.getProperty("AWT.separator", "NumPad ,");
			// End Numeric Zone

			// Begin Modifier and Control Keys
			case VC_SHIFT:
				return	Toolkit.getProperty("AWT.shift", "Shift");
			case VC_CONTROL:
				return Toolkit.getProperty("AWT.control", "Control");
			case VC_ALT:
				return Toolkit.getProperty("AWT.alt", "Alt");
			case VC_META:
				return Toolkit.getProperty("AWT.meta", "Meta");
			case VC_CONTEXT_MENU:
				return Toolkit.getProperty("AWT.context", "Context Menu");
			// End Modifier and Control Keys


			// Begin Media Control Keys
			case VC_POWER:
				return Toolkit.getProperty("AWT.power", "Power");
			case VC_SLEEP:
				return Toolkit.getProperty("AWT.sleep", "Sleep");
			case VC_WAKE:
				return Toolkit.getProperty("AWT.wake", "Wake");

			case VC_MEDIA_PLAY:
				return Toolkit.getProperty("AWT.play", "Play");
			case VC_MEDIA_STOP:
				return Toolkit.getProperty("AWT.stop", "Stop");
			case VC_MEDIA_PREVIOUS:
				return Toolkit.getProperty("AWT.previous", "Previous");
			case VC_MEDIA_NEXT:
				return Toolkit.getProperty("AWT.next", "Next");
			case VC_MEDIA_SELECT:
				return Toolkit.getProperty("AWT.select", "Select");
			case VC_MEDIA_EJECT:
				return Toolkit.getProperty("AWT.eject", "Eject");

			case VC_VOLUME_MUTE:
				return Toolkit.getProperty("AWT.mute", "Mute");
			case VC_VOLUME_UP:
				return Toolkit.getProperty("AWT.volup", "Volume Up");
			case VC_VOLUME_DOWN:
				return Toolkit.getProperty("AWT.voldn", "Volume Down");

			case VC_APP_MAIL:
				return Toolkit.getProperty("AWT.app_mail", "App Mail");
			case VC_APP_CALCULATOR:
				return Toolkit.getProperty("AWT.app_calculator", "App Calculator");
			case VC_APP_MUSIC:
				return Toolkit.getProperty("AWT.app_music", "App Music");
			case VC_APP_PICTURES:
				return Toolkit.getProperty("AWT.app_pictures", "App Pictures");

			case VC_BROWSER_SEARCH:
				return Toolkit.getProperty("AWT.search", "Browser Search");
			case VC_BROWSER_HOME:
				return Toolkit.getProperty("AWT.homepage", "Browser Home");
			case VC_BROWSER_BACK:
				return Toolkit.getProperty("AWT.back", "Browser Back");
			case VC_BROWSER_FORWARD:
				return Toolkit.getProperty("AWT.forward", "Browser Forward");
			case VC_BROWSER_STOP:
				return Toolkit.getProperty("AWT.stop", "Browser Stop");
			case VC_BROWSER_REFRESH:
				return Toolkit.getProperty("AWT.refresh", "Browser Refresh");
			case VC_BROWSER_FAVORITES:
				return Toolkit.getProperty("AWT.favorites", "Browser Favorites");
			// End Media Control Keys

			// Begin Japanese Language Keys
			case VC_KATAKANA:
				return Toolkit.getProperty("AWT.katakana", "Katakana");
			case VC_UNDERSCORE:
				return Toolkit.getProperty("AWT.underscore", "Underscore");
			case VC_FURIGANA:
				return Toolkit.getProperty("AWT.furigana", "Furigana");
			case VC_KANJI:
				return Toolkit.getProperty("AWT.kanji", "Kanji");
			case VC_HIRAGANA:
				return Toolkit.getProperty("AWT.hiragana", "Hiragana");
			case VC_YEN:
				return Toolkit.getProperty("AWT.yen", Character.toString((char) 0x00A5));
			// End Japanese Language Keys


			// Begin Sun keyboards
			case VC_SUN_HELP:
				return Toolkit.getProperty("AWT.sun_help", "Sun Help");

			case VC_SUN_STOP:
				return Toolkit.getProperty("AWT.sun_stop", "Sun Stop");
			case VC_SUN_PROPS:
				return Toolkit.getProperty("AWT.sun_props", "Sun Props");
			case VC_SUN_FRONT:
				return Toolkit.getProperty("AWT.sun_front", "Sun Front");
			case VC_SUN_OPEN:
				return Toolkit.getProperty("AWT.sun_open", "Sun Open");
			case VC_SUN_FIND:
				return Toolkit.getProperty("AWT.sun_find", "Sun Find");
			case VC_SUN_AGAIN:
				return Toolkit.getProperty("AWT.sun_again", "Sun Again");
			case VC_SUN_COPY:
				return Toolkit.getProperty("AWT.sun_copy", "Sun Copy");
			case VC_SUN_INSERT:
				return Toolkit.getProperty("AWT.sun_insert", "Sun Insert");
			case VC_SUN_CUT:
				return Toolkit.getProperty("AWT.sun_cut", "Sun Cut");
			// End Sun keyboards

			case VC_UNDEFINED:
				return Toolkit.getProperty("AWT.undefined", "Undefined");
		}

		return Toolkit.getProperty("AWT.unknown", "Unknown") +
				" keyCode: 0x" + Integer.toString(keyCode, 16);
	}
}
