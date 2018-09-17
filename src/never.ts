import { ParmenidesNeverError } from './errors/parmenides-never.error';

/**
 * A Contract to `never`. It is actually a function that will always throw an error if called.
 * @param x must be of type `never`.
 * @returns `never`.
 */
export const never = (x: never) => {
	throw new ParmenidesNeverError(x);
};
