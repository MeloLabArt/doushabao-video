import { DraggableItem } from "@/components/editor/panels/assets/draggable-item";
import { PanelView } from "@/components/editor/panels/assets/views/base-panel";
import { useEditor } from "@/editor/use-editor";
import { useTranslation } from "react-i18next";
import { DEFAULTS } from "@/timeline/defaults";
import { buildTextElement } from "@/timeline/element-utils";
import type { MediaTime } from "@/wasm";

export function TextView() {
	const { t } = useTranslation();
	const editor = useEditor();

	const handleAddToTimeline = ({ currentTime }: { currentTime: MediaTime }) => {
		const activeScene = editor.scenes.getActiveScene();
		if (!activeScene) return;

		const element = buildTextElement({
			raw: DEFAULTS.text.element,
			startTime: currentTime,
		});

		editor.timeline.insertElement({
			element,
			placement: { mode: "auto" },
		});
	};

	return (
		<PanelView title={t("textPanel.text")}>
			<DraggableItem
				name={t("textPanel.defaultText")}
				preview={
					<div className="bg-accent flex size-full items-center justify-center rounded">
						<span className="text-xs select-none">{t("textPanel.defaultText")}</span>
					</div>
				}
				dragData={{
					id: "temp-text-id",
					type: DEFAULTS.text.element.type,
					name: DEFAULTS.text.element.name,
					content: t("textPanel.defaultText"),
				}}
				aspectRatio={1}
				onAddToTimeline={handleAddToTimeline}
				shouldShowLabel={false}
			/>
		</PanelView>
	);
}
