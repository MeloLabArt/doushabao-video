import Image from "next/image";
import { t } from "@/lib/i18n/t";
import type { GuideDefinition } from "@/guides/types";
import { TikTokLayout } from "./tiktok-layout";

function PlatformLogo({
	domain,
	className = "size-4",
}: {
	domain: string;
	className?: string;
}) {
	return (
		<Image
			src={`https://cdn.brandfetch.io/${domain}/w/64/h/64`}
			alt=""
			width={18}
			height={18}
			className={className}
			draggable={false}
			unoptimized
		/>
	);
}

function PlatformGuidePreview({ domain }: { domain: string }) {
	return <PlatformLogo domain={domain} />;
}

function platformGuide({
	id,
	label,
	domain,
}: {
	id: string;
	label: string;
	domain: string;
}): GuideDefinition {
	return {
		id,
		label,
		renderPreview: () => <PlatformGuidePreview domain={domain} />,
		renderTriggerIcon: () => <PlatformLogo domain={domain} />,
		renderOverlay: () => null,
	};
}

export const tiktokGuide: GuideDefinition = {
	...platformGuide({ id: "tiktok", label: t("guides.tiktok"), domain: "tiktok.com" }),
	renderOverlay: () => <TikTokLayout />,
};
export const igReelsGuide = platformGuide({
	id: "ig-reels",
	label: t("guides.reels"),
	domain: "instagram.com",
});
export const ytShortsGuide = platformGuide({
	id: "yt-shorts",
	label: t("guides.shorts"),
	domain: "youtube.com",
});
export const spotlightGuide = platformGuide({
	id: "spotlight",
	label: t("guides.spotlight"),
	domain: "snapchat.com",
});
