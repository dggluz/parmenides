import { ParmenidesSimpleError } from './errors/parmenides-simple.error';

/**
 * Null Contract: identity function that throws an error if it is called with something but null.
 * @param x null
 * @returns null.
 */
export const nil = (x: null) => {
	if (x !== null) {
		throw new ParmenidesSimpleError('null', x);
	}
	return x;
};
