// * global
declare global {
	interface Navigator {
		msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
		browserLanguage: string;
	}
	interface Window {
		_AMapSecurityConfig: any;
	}
}

export {};
