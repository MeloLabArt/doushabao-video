"use client";

import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { UploadIcon } from "@hugeicons/core-free-icons";

interface MediaDragOverlayProps {
	isVisible: boolean;
	isProcessing?: boolean;
	progress?: number;
	onClick?: () => void;
}

export function MediaDragOverlay({
	isVisible,
	isProcessing = false,
	progress = 0,
	onClick,
}: MediaDragOverlayProps) {
	const { t } = useTranslation();
	if (!isVisible) return null;

	const handleClick = ({
		event,
	}: {
		event: React.MouseEvent<HTMLButtonElement>;
	}) => {
		if (isProcessing || !onClick) return;
		event.preventDefault();
		event.stopPropagation();
		onClick();
	};

	return (
		<button
			className="bg-foreground/5 hover:bg-foreground/10 flex flex-col items-center justify-center gap-4 rounded-lg p-8 text-center"
			type="button"
			disabled={isProcessing || !onClick}
			onClick={(event) => handleClick({ event })}
		>
			<div className="flex items-center justify-center">
				<HugeiconsIcon icon={UploadIcon} className="text-foreground size-10" />
			</div>

			<div className="space-y-2">
				<p className="text-muted-foreground max-w-sm text-xs">
					{isProcessing
						? t("mediaUpload.processingFiles", { progress })
						: t("mediaUpload.dragDropHint")}
				</p>
			</div>

			{isProcessing && (
				<div className="w-full max-w-xs">
					<div className="bg-accent h-1.5 w-full overflow-hidden rounded-full">
						<div
							className="bg-foreground h-full transition-all duration-200"
							style={{ width: `${Math.min(progress, 100)}%` }}
						/>
					</div>
				</div>
			)}
		</button>
	);
}
