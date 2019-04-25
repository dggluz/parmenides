import { ValidationError, isTypeError } from './parmenides.error';

// TODO: discuss if never should be a part of parmenides or if it should
// be replaced with a custom assertNever in the project that you need

export const isNeverError  = isTypeError<ParmenidesNeverError>('NeverError');

/**
 * Error that is thrown whenever a value was expected to never happen but happened.
 */
export class ParmenidesNeverError extends TypeError implements ValidationError {
	kind = 'ValidationError' as const;
	type = 'NeverError';

	/**
	 * @constructor
	 * @param actualValue the unexpected value.
	 */
	constructor (public actualValue: unknown) {
		super(`Expected to never happened, but ${typeof actualValue} was found (with value "${actualValue}").`);
	}

	explain() {
		return this.message;
	}

	eq(error: ValidationError): boolean {
		return isNeverError(error) && error.actualValue === this.actualValue;
	}
}
