import { ParmenidesError } from './parmenides.error';

/**
 * @class
 * Error that is thrown whenever a value was expected to never happen but happened.
 */
export class ParmenidesNeverError extends ParmenidesError {
	/**
	 * @constructor
	 * @param actualValue the unexpected value.
	 */
	constructor (public actualValue: any) {
		super(`Expected to never happened, but ${typeof actualValue} was found (with value "${actualValue}").`);
	}
}
