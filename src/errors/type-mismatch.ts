import { ValidationError, isTypeError } from './parmenides.error';

export const isTypeMismatchError = isTypeError<TypeMismatch>('TypeMismatch');

/**
 * Error thrown when one type was expected, but got another type instead
 */
// TODO: rename to TypeMismatchError
export class TypeMismatch extends TypeError implements ValidationError  {
	name = "TypeMismatch";
	kind = 'ValidationError' as const;

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

	explainCause(): string {
		if ((typeof this.actualValue) === 'undefined') {
			return `was expected to be of type "${this.expectedType}", but is undefined`;
		} else {
			return `was expected to be of type "${this.expectedType}", but is of type "${typeof this.actualValue}" (with value "${this.actualValue}")`;
		}
	}

	eq(error: ValidationError): boolean {
		return isTypeMismatchError(error)
			&& this.expectedType === error.expectedType
			&& this.actualValue === error.actualValue;
	}
}



