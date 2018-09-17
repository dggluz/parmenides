import { ParmenidesSimpleError } from './errors/parmenides-simple.error';

/**
 * @ignore
 */
export type BasicType = string | number | boolean;

/**
 * Function that takes a literal value (a particular string, number or boolean) and returns a Contract
 * to that literal value.
 * Example: `lit('foo')` will return a Contract that only accepts the "foo" value.
 * For several literal values, see `oneOf`.
 * @param expectedValue the expected literal value.
 * @returns a Contract to that literal value.
 */
export const lit = <T extends BasicType> (expectedValue: T) =>
	(x: T) => {
		if (x !== expectedValue) {
			throw new ParmenidesSimpleError(`'${expectedValue}'`, x);
		}
		return x;
	}
;
