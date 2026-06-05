"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGE_OPTIONS, type SupportedLanguage } from "./config";

export function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const [open, setOpen] = useState(false);

	const currentLang = i18n.language?.split("-")?.[0]
		? (i18n.language as SupportedLanguage)
		: "en";

	const currentOption =
		LANGUAGE_OPTIONS.find((opt) => opt.value === currentLang) ??
		LANGUAGE_OPTIONS[0];

	const handleLanguageChange = (lang: SupportedLanguage) => {
		i18n.changeLanguage(lang);
		setOpen(false);
	};

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="text-xs gap-1 px-2">
					<span>{currentOption.nativeLabel}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-[120px]">
				{LANGUAGE_OPTIONS.map((option) => (
					<DropdownMenuItem
						key={option.value}
						onClick={() => handleLanguageChange(option.value)}
						className={currentLang === option.value ? "bg-accent" : ""}
					>
						{option.nativeLabel}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
