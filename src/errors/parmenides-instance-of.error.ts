import { ParmenidesError } from './parmenides.error';

/**
 * Type of a constructor
 */
export type Constructor <T> = {
	new(...args: any[]): T;
};

/**
 * @class
 * Error thrown when an object is instance of other class than the expected one.
 */
export class ParmenidesInstanceOfError <T> extends ParmenidesError {
	/**
	 * @constructor
	 * @param constructor the constructor the object was expected to be instance of.
	 * @param actualValue the value that is NOT instance of the supplied constructor.
	 */
	constructor (constructor: Constructor<T>, actualValue: any) {
		super(`An instance of ${constructor.name} was expected, but ${typeof actualValue} was found (with value "${actualValue}").`);
	}
}
