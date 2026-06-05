import { t } from "@/lib/i18n/t";
import type { NormalizedCubicBezier } from "@/animation/types";

export const PRESET_MATCH_TOLERANCE = 0.02;

export interface EasingPreset {
	id: string;
	label: string;
	value: NormalizedCubicBezier;
	isCustom?: boolean;
}

export const BUILTIN_PRESETS: EasingPreset[] = [
	{ id: "smooth", label: t("graphEditor.smooth"), value: [0.25, 0.1, 0.25, 1] },
	{ id: "ease-out", label: t("graphEditor.easeOut"), value: [0, 0, 0.2, 1] },
	{ id: "ease-in", label: t("graphEditor.easeIn"), value: [0.8, 0, 1, 1] },
	{ id: "ease-in-out", label: t("graphEditor.inOut"), value: [0.4, 0, 0.2, 1] },
	{ id: "pop", label: t("graphEditor.pop"), value: [0.175, 0.885, 0.32, 1.275] },
	{ id: "linear", label: t("graphEditor.linear"), value: [0, 0, 1, 1] },
];
