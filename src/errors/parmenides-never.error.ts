import { ParmenidesError } from './parmenides.error';

export class ParmenidesNeverError extends ParmenidesError {
	constructor (public actualValue: any) {
		super(`Expected to never happened, but ${typeof actualValue} was found (with value "${actualValue}").`);
	}
}
