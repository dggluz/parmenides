import { TypeMismatch } from './errors/parmenides-simple.error';

/**
 * Array Contract: identity function that throws an error if it is called with something but an array.
 * It doesn't check anything about the array's elements, but only that it is an array.
 * For checking array's elements, see `arrOf`.
 * @param x a number
 * @returns x.
 */
export const arr = <T> (xs: T[]) => {
	if (!Array.isArray(xs)) {
		throw new TypeMismatch('Array', xs);
	}
	return xs;
};
