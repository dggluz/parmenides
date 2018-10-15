import { ParmenidesError } from './parmenides.error';

/**
 * @class
 * Generic ParmenidesError, used for most cases where a value of a type was expected
 * but a value of another type was received.
 */
export class ParmenidesSimpleError extends ParmenidesError {
	/**
	 * @constructor
	 * @param expectedType the expected type.
	 * @param actualValue the unexpected value that was received.
	 */
	constructor (public expectedType: string, public actualValue: any) {
		super(`${expectedType} expected, but ${typeof actualValue} was found (with value "${actualValue}").`);
	}
}
