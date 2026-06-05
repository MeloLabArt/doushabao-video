import {
	applyMaskFeather as applyMaskFeatherWasm,
	initializeGpu,
} from "opencut-wasm";

let gpuAvailable = false;
let initPromise: Promise<void> | null = null;

export function initializeGpuRenderer(): Promise<void> {
	if (!initPromise) {
		initPromise = initializeGpu()
			.then(() => {
				gpuAvailable = true;
			})
			.catch((error: unknown) => {
				gpuAvailable = false;
				const message = error instanceof Error ? error.message : String(error);
				console.warn(`GPU renderer unavailable: ${message}`);
			});
	}
	return initPromise;
}

export function isGpuAvailable(): boolean {
	return gpuAvailable;
}

export function applyMaskFeather({
	maskCanvas,
	width,
	height,
	feather,
}: {
	maskCanvas: OffscreenCanvas;
	width: number;
	height: number;
	feather: number;
}): OffscreenCanvas {
	if (!gpuAvailable) {
		return maskCanvas;
	}

	return applyMaskFeatherWasm({
		mask: maskCanvas,
		width,
		height,
		feather,
	});
}
