"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useStoragePersistence } from "@/services/storage/use-storage-persistence";

export function StoragePersistenceDialog() {
	const { t } = useTranslation();
	const { showDialog, onConfirm, onDismiss } = useStoragePersistence();

	return (
		<Dialog open={showDialog} onOpenChange={(open) => !open && onDismiss()}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{t("storage.title")}</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<p className="text-base text-muted-foreground">
						{t("storage.desc")}
					</p>
					<p className="text-base text-muted-foreground">
						{t("storage.allow")}
					</p>
				</DialogBody>
				<DialogFooter>
					<Button variant="outline" onClick={onDismiss}>
						{t("common.notNow")}
					</Button>
					<Button onClick={onConfirm}>{t("common.allow")}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
