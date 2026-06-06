import type { MaskableElement } from "./types";
import type { ParamValues } from "@/params";

interface BaseDragData {
	id: string;
	name: string;
}

export interface MediaDragData extends BaseDragData {
	type: "media";
	mediaType: "image" | "video" | "audio";
	targetElementTypes?: MaskableElement["type"][];
}

export interface TextDragData extends BaseDragData {
	type: "text";
	content: string;
}


export interface GraphicDragData extends BaseDragData {
	type: "graphic";
	definitionId: string;
	params: Partial<ParamValues>;
}

export type TimelineDragData =
	| MediaDragData
	| TextDragData
	
	| GraphicDragData;
