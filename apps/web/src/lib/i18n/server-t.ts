/**
 * Server-safe translation function.
 * Use this in server components (pages without "use client").
 * Returns English text as fallback since server-side language detection is limited.
 */

import en from "./locales/en.json";
import zhCN from "./locales/zh-CN.json";
import zhHK from "./locales/zh-HK.json";

const resources: Record<string, Record<string, unknown>> = {
	en,
	"zh-CN": zhCN,
	"zh-HK": zhHK,
};

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

const defaultLang = "en";

export function serverT(key: string, vars?: Record<string, string | number>): string {
	const val = getValue(resources[defaultLang] as Record<string, unknown>, key);
	return interpolate(val, vars);
}
