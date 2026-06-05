import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

export function DeleteProjectDialog({
	isOpen,
	onOpenChange,
	onConfirm,
	projectNames,
}: {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	projectNames: string[];
}) {
	const { t } = useTranslation();
	const count = projectNames.length;
	const isSingle = count === 1;
	const singleName = isSingle ? projectNames[0] : null;

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent
				onOpenAutoFocus={(event) => {
					event.preventDefault();
					event.stopPropagation();
				}}
			>
				<DialogHeader>
					<DialogTitle>
						{singleName ? (
							<>
								{t("projectDialog.deleteSingle", { name: singleName })}
							</>
						) : (
							t("projectDialog.deleteMultiple", { count })
						)}
					</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<Alert variant="destructive">
						<AlertTitle>{t("projectDialog.deleteWarning")}</AlertTitle>
						<AlertDescription>
							{isSingle
								? t("projectDialog.deleteWarningDesc", { name: singleName })
								: t("projectDialog.deleteWarningMultiple", { count })}
						</AlertDescription>
					</Alert>
					<div className="flex flex-col gap-3">
						<Label className="text-xs font-semibold text-slate-500">
							{t("projectDialog.deleteConfirmLabel")}
						</Label>
						<Input
							type="text"
							placeholder={t("projectDialog.deleteConfirmPlaceholder")}
							size="lg"
							variant="destructive"
						/>
					</div>
				</DialogBody>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						{t("common.cancel")}
					</Button>
					<Button variant="destructive" onClick={onConfirm}>
						{t("projectDialog.deleteButton")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
