"use client";

import { type ReactNode, useEffect } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import zhCN from "./locales/zh-CN.json";
import zhHK from "./locales/zh-HK.json";

// Initialize i18n at module level — always English so SSR and first client render
// produce identical HTML. Language detection is deferred to useEffect (after hydration)
// to avoid hydration mismatches caused by the browser language differing from the server.
if (!i18n.isInitialized) {
	i18n.use(initReactI18next).init({
		resources: {
			en: { translation: en },
			"zh-CN": { translation: zhCN },
			"zh-HK": { translation: zhHK },
		},
		lng: "en",
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
		returnNull: false,
	});
}

export function I18nProvider({ children }: { children: ReactNode }) {
	useEffect(() => {
		// Register LanguageDetector post-hydration so:
		// 1. The user's stored/navigator language is picked up without causing a
		//    hydration mismatch (both SSR and first client render always use "en").
		// 2. Future changeLanguage() calls (e.g. from LanguageSwitcher) are cached
		//    to localStorage via the detector.
		i18n.use(LanguageDetector).init({
			detection: {
				order: ["localStorage", "navigator"],
				caches: ["localStorage"],
				lookupLocalStorage: "i18nextLng",
			},
		});
	}, []);

	return <>{children}</>;
}
