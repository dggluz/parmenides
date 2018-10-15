import { ParmenidesError } from './parmenides.error';

/**
 * @class
 * Error that represents an unexpected property into an object.
 */
export class ParmenidesExtraPropertyError extends ParmenidesError {
	/**
	 * @constructor
	 * @param propertyName the unexpected property name
	 */
	constructor (propertyName: string) {
		super(`Extra property "${propertyName}"`);
	}
}

