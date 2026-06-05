import i18n from "i18next";
import en from "./locales/en.json";
import zhCN from "./locales/zh-CN.json";
import zhHK from "./locales/zh-HK.json";

const SUPPORTED_LANGUAGES = ["en", "zh-CN", "zh-HK"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export interface LanguageOption {
	value: SupportedLanguage;
	label: string;
	nativeLabel: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
	{ value: "en", label: "English", nativeLabel: "English" },
	{ value: "zh-CN", label: "简体中文", nativeLabel: "简体中文" },
	{ value: "zh-HK", label: "繁體中文", nativeLabel: "繁體中文" },
];

export const isSupportedLanguage = (
	lang: string,
): lang is SupportedLanguage => {
	return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
};

export const resources = {
	en: { translation: en },
	"zh-CN": { translation: zhCN },
	"zh-HK": { translation: zhHK },
};

export default i18n;
