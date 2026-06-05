import { t } from "@/lib/i18n/t";
import type { TrackType } from "@/timeline";

export const DEFAULT_TRACK_NAMES: Record<TrackType, string> = {
	video: t("tracks.video"),
	text: t("tracks.text"),
	audio: t("tracks.audio"),
	graphic: t("tracks.graphic"),
};
