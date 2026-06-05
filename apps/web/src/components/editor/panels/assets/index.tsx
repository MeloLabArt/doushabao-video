"use client";

import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { type Tab, useAssetsPanelStore } from "@/components/editor/panels/assets/assets-panel-store";
import { TabBar } from "./tabbar";
import { MediaView } from "./views/assets";
import { SettingsView } from "./views/settings";

export function AssetsPanel() {
	const { activeTab } = useAssetsPanelStore();

	const { t } = useTranslation();
	const viewMap: Record<Tab, React.ReactNode> = {
		media: <MediaView />,
		settings: <SettingsView />,
	};

	return (
		<div className="panel bg-background flex h-full rounded-sm border overflow-hidden">
			<TabBar />
			<Separator orientation="vertical" />
			<div className="flex-1 overflow-hidden">{viewMap[activeTab]}</div>
		</div>
	);
}
