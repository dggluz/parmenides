import { ParmenidesSimpleError } from './errors/parmenides-simple.error';

export const nil = (x: null) => {
	if (x !== null) {
		throw new ParmenidesSimpleError('null', x);
	}
	return x;
};
