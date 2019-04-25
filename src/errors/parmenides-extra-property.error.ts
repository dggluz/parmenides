import { ValidationError, isTypeError } from './parmenides.error';

export const isExtraPropertyError  = isTypeError<ParmenidesExtraPropertyError>('ExtraPropertyError');

/**
 * Error that represents an unexpected property into an object.
 */
export class ParmenidesExtraPropertyError extends TypeError implements ValidationError {
	kind = 'ValidationError' as const;
	type = 'ExtraPropertyError';

	/**
	 * @constructor
	 * @param extraPropertyName the unexpected property name
	 */
	constructor (public extraPropertyName: string) {
		super(`Extra property "${extraPropertyName}"`);
	}

	explain(): string {
		return this.message;
	}

	eq(error: ValidationError): boolean {
		return isExtraPropertyError(error) && error.extraPropertyName === this.extraPropertyName;
	}
}


