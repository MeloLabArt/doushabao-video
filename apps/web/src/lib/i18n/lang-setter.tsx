"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Syncs the current i18n language to the <html> lang attribute.
 * This component must be a client component.
 */
export function LangSetter() {
	const { i18n } = useTranslation();

	useEffect(() => {
		const updateLang = () => {
			document.documentElement.lang = i18n.language || "en";
		};

		updateLang();
		i18n.on("languageChanged", updateLang);

		return () => {
			i18n.off("languageChanged", updateLang);
		};
	}, [i18n]);

	return null;
}
