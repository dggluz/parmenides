import { arr } from './arr';
import { ParmenidesError } from './errors/parmenides.error';
import { ParmenidesArrOfError } from './errors/parmenides-arr-of.error';
import { Mapper } from './contract';

/**
 * Function that takes a Contract and returns another Contract for an array where all the elements
 * should comply with first Contract.
 * Example: `arrOf(str)` will return a Contract to a `string[]`.
 * @param mapperFn the Contract the elements should comply to.
 * @returns Contract of an array to the first Contract.
 */
export const arrOf = <A, B> (mapperFn: Mapper<A, B>): Mapper<A[], B[]> =>
	xs =>
		arr(xs)
			.map((elem, i) => {
				try {
					return mapperFn(elem);
				}
				catch (err) {
					if (err instanceof ParmenidesError) {
						throw new ParmenidesArrOfError(err, i);
					}
					else {
						throw err;
					}
				}
			});
;
