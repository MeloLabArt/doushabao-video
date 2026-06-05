import { toast } from "sonner";
import { t } from "@/lib/i18n/t";

export interface MediaUploadToastResult {
	uploadedCount: number;
	assetNames?: string[];
}

export async function showMediaUploadToast<T extends MediaUploadToastResult>({
	filesCount,
	promise,
}: {
	filesCount: number;
	promise: Promise<T> | (() => Promise<T>);
}) {
	const run = typeof promise === "function" ? promise : () => promise;
	const toastPromise = toast.promise(async () => {
		await waitForNextPaint();
		return run();
	}, {
		loading: t("mediaUpload.uploading", { n: filesCount }),
		success: ({ uploadedCount, assetNames }: MediaUploadToastResult) => {
			if (uploadedCount === 1) {
				const assetName = assetNames?.[0];
				return assetName
					? t("mediaUpload.successSingle", { name: assetName })
					: t("mediaUpload.successOneMedia");
			}

			if (uploadedCount > 1) {
				return t("mediaUpload.successMultiple", { n: uploadedCount });
			}

			return t("mediaUpload.noMediaUploaded");
		},
		error: t("mediaUpload.failed", { n: filesCount }),
	});

	return toastPromise.unwrap();
}

function waitForNextPaint(): Promise<void> {
	return new Promise((resolve) => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => resolve());
		});
	});
}
