import { ParmenidesError } from './parmenides-error';

export class ParmenidesSimpleError extends ParmenidesError {
	constructor (public expectedType: string, public actualValue: any) {
		super(`${expectedType} expected, but ${typeof actualValue} was found (with value "${actualValue}").`);
	}
}
