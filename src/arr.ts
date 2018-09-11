import { ParmenidesSimpleError } from './errors/parmenides-simple.error';

export const arr = <T> (xs: T[]) => {
	if (!Array.isArray(xs)) {
		throw new ParmenidesSimpleError('Array', xs);
	}
	return xs;
};
