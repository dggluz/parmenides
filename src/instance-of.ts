import { Contract } from './contract';
import { Constructor, ParmenidesInstanceOfError } from './errors/parmenides-instance-of-error';

export const instanceOf = <T> (Constructor: Constructor<T>): Contract<T> => x => {
	if (!(x instanceof Constructor)) {
		throw new ParmenidesInstanceOfError(Constructor, x);
	}
	return x;
};
