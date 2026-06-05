"use client";

import { type ReactNode } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import zhCN from "./locales/zh-CN.json";
import zhHK from "./locales/zh-HK.json";

// Initialize i18n synchronously at module level.
// Must use initReactI18next so the useTranslation hook works.
// Server-side: init without LanguageDetector.
// Client-side: full init with language detection.
if (!i18n.isInitialized) {
	const isClient = typeof window !== "undefined";

	i18n.use(initReactI18next);

	if (isClient) {
		i18n.use(LanguageDetector);
	}

	i18n.init({
		resources: {
			en: { translation: en },
			"zh-CN": { translation: zhCN },
			"zh-HK": { translation: zhHK },
		},
		fallbackLng: "en",
		...(isClient && {
			detection: {
				order: ["localStorage", "navigator"],
				caches: ["localStorage"],
				lookupLocalStorage: "i18nextLng",
			},
		}),
		interpolation: {
			escapeValue: false,
		},
		returnNull: false,
	});
}

export function I18nProvider({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
