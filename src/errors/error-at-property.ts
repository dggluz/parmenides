import { ValidationError, isTypeError, getAccesor } from './parmenides.error';

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
const getAccessorFromProperty = (property: string) =>
	canHaveDotNotation(property) ?
		`.${property}` :
		`['${property.replace(/'/g, "\\'")}']`
;

export const isErrorAtProperty  = isTypeError<ErrorAtProperty>('ErrorAtProperty');

/**
 * Error that wraps another error generated from an object's property.
 */
export class ErrorAtProperty extends TypeError implements ValidationError {
	name = 'ErrorAtProperty'
	kind = 'ValidationError' as const;
	/**
	 * @constructor
	 * @param originalError the original error thrown.
	 * @param key the property name of the element the error comes from.
	 */
	constructor (public key: string, public originalError: ValidationError) {
		super('');

		this.message = this.explain();
	}

	/**
	 * @returns a human-readable error message with the original error's message and the path to it.
	 */
	explain () {
		return `property "${this.getAccesor(true)}" ${this.explainCause()}`;
	}

	eq(error: ValidationError): boolean {
		return isErrorAtProperty(error) && this.key === error.key && this.originalError.eq(error.originalError);
	}

	getAccesor (isTopLevelError: boolean) {
		const originalErrorAccessor = getAccesor(this.originalError, false)

		if (isTopLevelError) {
			return this.key + originalErrorAccessor;
		} else {
			return `${getAccessorFromProperty(this.key)}${originalErrorAccessor}`;
		}
	}

	explainCause() {
		return this.originalError.explainCause();
	}
}


