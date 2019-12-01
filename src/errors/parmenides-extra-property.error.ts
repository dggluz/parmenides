import { ValidationError, isTypeError } from './parmenides.error';

export const isExtraPropertyError  = isTypeError<ParmenidesExtraPropertyError>('ExtraPropertyError');

/**
 * Error that represents an unexpected property into an object.
 */
export class ParmenidesExtraPropertyError extends TypeError implements ValidationError {
	name = 'ExtraPropertyError';
	kind = 'ValidationError' as const;

	/**
	 * @constructor
	 * @param extraPropertyName the unexpected property name
	 */
	constructor (public extraPropertyName: string) {
		super(`has extra property "${extraPropertyName}"`);
	}

	explain() {
		return `object ${this.message}`;
	}

	explainCause() {
		return this.message;
	}


	eq(error: ValidationError): boolean {
		return isExtraPropertyError(error) && error.extraPropertyName === this.extraPropertyName;
	}
}


