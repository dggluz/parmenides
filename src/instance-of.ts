import { Contract } from './contract';
import { Constructor, ParmenidesInstanceOfError } from './errors/parmenides-instance-of.error';

/**
 * Takes a Constructor as a parameter and returns a Contract to instances of those Constructor.
 * For example: `instanceOf(Set)` will return a Contract to Set instances.
 * @param Constructor 
 * @returns Contract to instances of the Constructor.
 */
export const instanceOf = <T> (Constructor: Constructor<T>): Contract<T> => x => {
	if (!(x instanceof Constructor)) {
		throw new ParmenidesInstanceOfError(Constructor, x);
	}
	return x;
};
