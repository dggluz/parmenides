import { ValidationError, isTypeError } from './parmenides.error';

export const isErrorAtIndex = isTypeError<ErrorAtIndex>('ErrorAtIndex');

/**
 * This error represents an error in an array's element and wraps that original error.
 */
export class ErrorAtIndex extends TypeError implements ValidationError {

	kind = 'ValidationError' as const;
	type = 'ErrorAtIndex';

	/**
	 * @param originalError A ParmenidesError that is thrown by an element of the array
	 * that doesn't comply the contract.
	 * @param index The index in the array of the element that doesn't comply the contract.
	 */
	constructor (public index: number, public originalError: ValidationError) {
		super(`Error at [${index}]: ${originalError.explain()}`);

		this.message = this.explain();
	}

	/**
	 * @returns the human-readable message telling the path to the error and the original's error message.
	 */
	explain () {
		return this.message
		// return `Invalid element arr${this.getNavigation()}: ${this.originalError.getGenericMessage()}`;
	}

	eq (error: ValidationError): boolean {
		return isErrorAtIndex(error) && error.index === this.index && error.originalError.eq(this.originalError);
	}
	// /**
	//  * @returns a string representation of the path to where the original error was originated from.
	//  */
	// getNavigation () {
	// 	return `[${this.index}]${this.originalError.getNavigation()}`;
	// }

	// /**
	//  * @returns an error message chunk to be used into another error message.
	//  */
	// getGenericMessage () {
	// 	return this.originalError.getGenericMessage();
	// }
}
