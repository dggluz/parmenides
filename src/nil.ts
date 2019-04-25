import { TypeMismatch } from './errors/type-mismatch';

/**
 * Null Contract: identity function that throws an error if it is called with something but null.
 * @param x null
 * @returns null.
 */
export const nil = (x: null) => {
	if (x !== null) {
		throw new TypeMismatch('null', x);
	}
	return x;
};
