import { t } from "@/lib/i18n/t";

export const BACKGROUND_BLUR_INTENSITY_PRESETS: Array<{
	label: string;
	value: number;
}> = [
	{ label: t("background.blurLight"), value: 100 },
	{ label: t("background.blurMedium"), value: 200 },
	{ label: t("background.blurHeavy"), value: 500 },
];

export const DEFAULT_BACKGROUND_BLUR_INTENSITY = 10;
