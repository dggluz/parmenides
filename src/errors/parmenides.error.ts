/**
 * @abstract
 * @class
 * A generic error. All other errors will inherit from this one, hence it's easy to check if an error is a
 * ParmenidesError (its instanceof ParmenidesError or has the public property ParmenidesError = 'ParmenidesError').
 * It also has some generic error methods.
 */
export abstract class ParmenidesError extends TypeError {
	ParmenidesError = 'ParmenidesError';

	/**
	 * @constructor
	 * @param message Message string
	 */
	constructor (message: string) {
		super(message);
	}

	/**
	 * @returns the message, intended to be human readable by itself.
	 */
	getMessage () {
		return this.message;
	}

	/**
	 * @returns an error message chunk intended to be used into a larger error message.
	 */
	getGenericMessage () {
		return this.getMessage();
	}

	/**
	 * @returns the "navigation" to the error source (useful only for nested errors, where the navigation
	 * is the path to the property or element that doesn't match the contract).
	 */
	getNavigation () {
		return '';
	}
}
