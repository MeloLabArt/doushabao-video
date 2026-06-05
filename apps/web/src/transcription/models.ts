import { t } from "@/lib/i18n/t";
import type {
	TranscriptionModel,
	TranscriptionModelId,
} from "./types";

export const TRANSCRIPTION_MODELS: TranscriptionModel[] = [
	{
		id: "whisper-tiny",
		name: t("transcription.tiny"),
		huggingFaceId: "onnx-community/whisper-tiny",
		description: t("transcription.tinyDesc"),
	},
	{
		id: "whisper-small",
		name: t("transcription.small"),
		huggingFaceId: "onnx-community/whisper-small",
		description: t("transcription.smallDesc"),
	},
	{
		id: "whisper-medium",
		name: t("transcription.medium"),
		huggingFaceId: "onnx-community/whisper-medium",
		description: t("transcription.mediumDesc"),
	},
	{
		id: "whisper-large-v3-turbo",
		name: t("transcription.largeV3Turbo"),
		huggingFaceId: "onnx-community/whisper-large-v3-turbo",
		description: t("transcription.largeV3TurboDesc"),
	},
];

export const DEFAULT_TRANSCRIPTION_MODEL: TranscriptionModelId =
	"whisper-small";
