import { ValidationError, isTypeError } from './parmenides.error';

export const isInstanceOfError  = isTypeError<ParmenidesInstanceOfError>('InstanceOfError');

/**
 * Type of a constructor
 */
export type Constructor <T> = {
	new(...args: any[]): T;
};

/**
 * Error thrown when an object is instance of other class than the expected one.
 */
export class ParmenidesInstanceOfError extends TypeError implements ValidationError {

	kind = 'ValidationError' as const;
	type = 'InstanceOfError';

	/**
	 * @constructor
	 * @param constructor the constructor the object was expected to be instance of.
	 * @param actualValue the value that is NOT instance of the supplied constructor.
	 */
	constructor (public constructor: Constructor<unknown>, public actualValue: unknown) {
		super(`An instance of ${constructor.name} was expected, but ${typeof actualValue} was found (with value "${actualValue}").`);
	}

	explain() {
		return this.message;
	}

	eq(error: ValidationError): boolean {
		return isInstanceOfError(error) && error.constructor === this.constructor && error.actualValue === this.actualValue;
	}
}
