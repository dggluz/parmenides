import { ValidationError, isTypeError, getAccesor } from './parmenides.error';

export const isErrorAtIndex = isTypeError<ErrorAtIndex>('ErrorAtIndex');

/**
 * This error represents an error in an array's element and wraps that original error.
 */
export class ErrorAtIndex extends TypeError implements ValidationError {
	name = 'ErrorAtIndex';
	kind = 'ValidationError' as const;

	/**
	 * @param originalError A ValidationError that is thrown by an element of the array
	 * that doesn't comply the contract.
	 * @param index The index in the array of the element that doesn't comply the contract.
	 */
	constructor (public index: number, public originalError: ValidationError) {
		super();

		this.message = this.explain();
	}

	/**
	 * @returns the human-readable message telling the path to the error and the original's error message.
	 */
	explain () {
		return `element of the array at position ${this.getAccesor()} ${this.originalError.explainCause()}`;
	}

	eq (error: ValidationError): boolean {
		return isErrorAtIndex(error) && error.index === this.index && error.originalError.eq(this.originalError);
	}

	explainCause() {
		return this.originalError.explainCause();
	}

	getAccesor() {
		return `[${this.index}]${getAccesor(this.originalError, false)}`;
	}
}
