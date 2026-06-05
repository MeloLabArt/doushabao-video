import { t } from "@/lib/i18n/t";
import type { ParamDefinition } from "@/params";

export type GraphicStrokeAlign = "inside" | "center" | "outside";

export const STROKE_ALIGN_PARAM: ParamDefinition<"strokeAlign"> = {
	key: "strokeAlign",
	label: t("params.strokeAlign"),
	type: "select",
	default: "center",
	group: "stroke",
	options: [
		{ value: "inside", label: t("params.inside") },
		{ value: "center", label: t("params.center") },
		{ value: "outside", label: t("params.outside") },
	],
};
