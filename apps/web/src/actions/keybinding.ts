import type { TActionWithOptionalArgs } from "./types";

/**
 * Alt is also regarded as macOS OPTION (⌥) key
 * Ctrl is also regarded as macOS COMMAND (⌘) key (NOTE: this differs from HTML Keyboard spec where COMMAND is Meta key!)
 */
export type ModifierKeys =
	| "ctrl"
	| "alt"
	| "shift"
	| "ctrl+shift"
	| "alt+shift"
	| "ctrl+alt"
	| "ctrl+alt+shift";

const KEYS = [
	"a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
	"k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
	"u", "v", "w", "x", "y", "z",
	"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
	"up", "down", "left", "right",
	"/", "?", ".",
	"enter", "tab", "space", "escape", "esc",
	"backspace", "delete", "home", "end",
] as const;

export type Key = (typeof KEYS)[number];

const KEY_SET: ReadonlySet<string> = new Set(KEYS);

export function isKey(value: string): value is Key {
	return KEY_SET.has(value);
}

export type ModifierBasedShortcutKey = `${ModifierKeys}+${Key}`;
// Singular keybindings (these will be disabled when an input-ish area has been focused)
export type SingleCharacterShortcutKey = `${Key}`;

export type ShortcutKey = ModifierBasedShortcutKey | SingleCharacterShortcutKey;

export type KeybindingConfig = {
	[key in ShortcutKey]?: TActionWithOptionalArgs;
};

// Build modifier-key pattern from the union type literal values.
// ModifierKeys can contain "+" (e.g. "ctrl+alt"), so we must treat
// them as atomic prefixes before the final "+Key" part.
const MODIFIER_VALUES = [
	"ctrl",
	"alt",
	"shift",
	"ctrl+shift",
	"alt+shift",
	"ctrl+alt",
	"ctrl+alt+shift",
] as const satisfies ModifierKeys[];

// Match: <modifier>+<key>  (modifier is one of the atomic values above)
function escapeRegex(s: string): string {
	return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const MODIFIER_PATTERN = MODIFIER_VALUES.map(escapeRegex).join("|");
const MODIFIER_SHORTCUT_RE = new RegExp(
	`^(${MODIFIER_PATTERN})\\+(${KEYS.map(escapeRegex).join("|")})$`,
);

export function isShortcutKey(value: string): value is ShortcutKey {
	// Single-character / bare-key shortcuts.
	if (isKey(value)) return true;
	// Modifier-based shortcuts: e.g. "ctrl+s", "ctrl+alt+shift+z".
	return MODIFIER_SHORTCUT_RE.test(value);
}
