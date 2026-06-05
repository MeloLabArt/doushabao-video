import type { Metadata } from "next";
import { BasePage } from "@/app/base-page";
import { Separator } from "@/components/ui/separator";
import {
	type Release as ReleaseType,
	getSortedReleases,
} from "@/changelog/utils";
import {
	ReleaseArticle,
	ReleaseMeta,
	ReleaseTitle,
	ReleaseDescription,
	ReleaseChanges,
} from "@/changelog/components/release";
import { serverT } from "@/lib/i18n/server-t";

export const metadata: Metadata = {
	title: "Changelog - Doushabao-Video",
	description: "What's new in Doushabao-Video",
	openGraph: {
		title: "Changelog - Doushabao-Video",
		description: "Every update, improvement, and fix to Doushabao-Video — documented.",
		type: "website",
		images: [
			{
				url: "/open-graph/changlog.jpg",
				width: 1200,
				height: 630,
				alt: "Doushabao-Video Changelog",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Changelog - Doushabao-Video",
		description: "What's new in Doushabao-Video",
		images: ["/open-graph/changlog.jpg"],
	},
};

export default function ChangelogPage() {
	const releases = getSortedReleases();

  const title = serverT("changelog.title");
  const desc = serverT("changelog.description");
	return (
		<BasePage title={title} description="See what's new in Doushabao-Video">
			<div className="mx-auto w-full max-w-3xl">
				<div className="relative">
					<div
						aria-hidden
						className="absolute top-2 bottom-0 left-[5px] w-px bg-border hidden sm:block"
					/>

					<div className="flex flex-col">
						{releases.map((release, releaseIndex) => (
							<div key={release.version} className="flex flex-col">
								<ReleaseEntry release={release} />
								{releaseIndex < releases.length - 1 && (
									<Separator className="my-10 sm:ml-1.5" />
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</BasePage>
	);
}

function ReleaseEntry({ release }: { release: ReleaseType }) {
	return (
		<ReleaseArticle variant="list" isLatest={release.isLatest}>
			<ReleaseMeta release={release} />
			<div className="flex flex-col gap-4">
				<ReleaseTitle as="h2" href={`/changelog/${release.version}`}>
					{release.title}
				</ReleaseTitle>
				{release.description && (
					<ReleaseDescription>{release.description}</ReleaseDescription>
				)}
			</div>
			<ReleaseChanges release={release} />
		</ReleaseArticle>
	);
}
