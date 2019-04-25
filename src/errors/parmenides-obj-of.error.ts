import { ValidationError, isTypeError } from './parmenides.error';

/**
 * Checks if a propertyName can be expressed in "dot notation" (e.g. ".property").
 * @param property the property name to check.
 */
const canHaveDotNotation = (property: string) =>
	// The property name can be expressed in "dot notation" if it is a valid identifier
	// (starts with a letter or underscore and contains only letters, underscores and numbers).
	// More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
	/^[a-z_]+[a-z0-9_]*$/i.test(property)
;

/**
 * @param property the property name to access.
 * @returns a string representation of the access to a property
 */
const getAccessor = (property: string) =>
	canHaveDotNotation(property) ?
		`.${property}` :
		`['${property.replace(/'/g, "\\'")}']`
;

export const isObjOfError  = isTypeError<ParmenidesObjOfError>('ObjOfError');

/**
 * Error that wraps another error generated from an object's property.
 */
export class ParmenidesObjOfError extends TypeError implements ValidationError {

	kind = "ValidationError" as const;
	type = 'ObjOfError';
	/**
	 * @constructor
	 * @param originalError the original error thrown.
	 * @param key the property name of the element the error comes from.
	 */
	// TODO: put key before the original error
	constructor (public originalError: ValidationError, public key: string) {
		super('');

		this.message = this.explain();
	}

	/**
	 * @returns a human-readable error message with the original error's message and the path to it.
	 */
	explain () {
		// TODO: improve
		return 'Invalid property';
		// return `Invalid property obj${this.getNavigation()}: ${this.originalError.getGenericMessage()}`;
	}

	eq(error: ValidationError): boolean {
		return isObjOfError(error) && this.key === error.key && this.originalError.eq(error.originalError);
	}
	// /**
	//  * @returns a string representation of the path to where the original error was originated from.
	//  */
	// getNavigation () {
	// 	return `${getAccessor(this.key)}${this.originalError.getNavigation()}`;
	// }

	// /**
	//  * @returns an error message chunk to be used into a larger error message.
	//  */
	// getGenericMessage () {
	// 	return this.originalError.getGenericMessage();
	// }
}


