import { ValidationError, isTypeError } from './parmenides.error';

export const isTypeMismatchError = isTypeError<TypeMismatch>('TypeMismatchError');

/**
 * Generic ParmenidesError, used for most cases where a value of a type was expected
 * but a value of another type was received.
 */
// TODO: rename to TypeMismatchError
export class TypeMismatch extends TypeError implements ValidationError  {

	kind = 'ValidationError' as const;
	type = 'TypeMismatchError';

	/**
	 * @constructor
	 * @param expectedType the expected type.
	 * @param actualValue the unexpected value that was received.
	 */

	constructor (public expectedType: string, public actualValue: unknown) {
		super(`${expectedType} expected, but ${typeof actualValue} was found (with value "${actualValue}").`);
		// TODO: see if as a part of the error we include the typeof of the actualValue
	}

	explain(): string {
		return this.message;
	}

	eq(error: ValidationError): boolean {
		return isTypeMismatchError(error)
			&& this.expectedType === error.expectedType
			&& this.actualValue === error.actualValue;
	}
}



