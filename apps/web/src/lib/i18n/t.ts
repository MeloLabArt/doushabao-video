/**
 * Standalone t() function for use outside React components.
 * Use this in .ts files, stores, managers, etc.
 */
import i18n, { resources } from "./config";
import type { TOptions } from "i18next";

function getValue(obj: Record<string, unknown>, path: string): string {
	const keys = path.split(".");
	let current: unknown = obj;
	for (const key of keys) {
		if (current && typeof current === "object" && key in current) {
			current = (current as Record<string, unknown>)[key];
		} else {
			return path;
		}
	}
	return typeof current === "string" ? current : path;
}

function interpolate(str: string, vars?: Record<string, string | number>): string {
	if (!vars) return str;
	return str.replace(/\{\{(\w+)\}\}/g, (_, key) => {
		const val = vars[key];
		return val !== undefined ? String(val) : `{{${key}}}`;
	});
}

export function t(key: string, options?: TOptions): string {
	if (i18n.isInitialized) {
		return i18n.t(key, options);
	}
	// Fallback: use English translations directly
	const val = getValue(resources.en as Record<string, unknown>, key);
	return interpolate(val, options as Record<string, string | number>);
}
