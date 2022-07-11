export interface BusinessRule {
	message: string;
	validate(): boolean;
}
