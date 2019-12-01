import { BasicType } from '../lit';
import { ValidationError, isTypeError } from './parmenides.error';

export const isOneOfError = isTypeError<ParmenidesOneOfError>('OneOfError');
function arrEq (xs: BasicType[], ys: BasicType[]): boolean {
	if (xs.length !== ys.length) {
		return false;
	} else {
		for (let i = 0; i < xs.length; i++) {
			if (xs[i] !== ys[i]) {
				return false;
			}
		}

		return true;
	}
}

/**
 * Error throw when a literal from a set of literals is expected but another value is received.
 */
// TODO: rename to OneOfError
export class ParmenidesOneOfError extends TypeError implements ValidationError {
	name = "OneOfError"
	kind = 'ValidationError' as const;

	/**
	 * @constructor
	 * @param validValues set expected values.
	 * @param actualValue unexpected received value.
	 */
	constructor (public validValues: BasicType[], public actualValue: unknown) {
		super(`Expected one of: [${validValues
				.map(x => `"${x.toString()}"`)
				.join(', ')
			}], but the value "${actualValue}" was found.`
		);
	}

	explain() {
		return this.message;
	}

	explainCause() {
		return this.message;
	}

	eq(error: ValidationError): boolean {
		return isOneOfError(error)
			&& this.actualValue === error.actualValue
			&& arrEq(this.validValues, error.validValues);
	}
}
