import { ParmenidesError } from './parmenides.error';

/**
 * @class
 * @extends ParmenidesError
 * This error represents an error in an array's element and wraps that original error.
 */
export class ParmenidesArrOfError extends ParmenidesError {
	/**
	 * @constructor
	 * @param originalError A ParmenidesError that is thrown by an element of the array
	 * that doesn't comply the contract.
	 * @param index The index in the array of the element that doesn't comply the contract.
	 */
	constructor (public originalError: ParmenidesError, public index: number) {
		super('');

		this.message = this.getMessage();
	}

	/**
	 * @returns the human-readable message telling the path to the error and the original's error message. 
	 */
	getMessage () {
		return `Invalid element arr${this.getNavigation()}: ${this.originalError.getGenericMessage()}`;
	}

	/**
	 * @returns a string representation of the path to where the original error was originated from.
	 */
	getNavigation () {
		return `[${this.index}]${this.originalError.getNavigation()}`;
	}

	/**
	 * @returns an error message chunk to be used into another error message.
	 */
	getGenericMessage () {
		return this.originalError.getGenericMessage();
	}
}
