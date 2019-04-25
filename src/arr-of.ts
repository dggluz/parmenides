import { Contract } from './contract';
import { arr } from './arr';
import { isValidationError } from './errors/parmenides.error';
import { ErrorAtIndex } from './errors/parmenides-arr-of.error';

/**
 * Function that takes a Contract and returns another Contract for an array where all the elements
 * should comply with first Contract.
 * Example: `arrOf(str)` will return a Contract to a `string[]`.
 * @param contract the Contract the elements should comply to.
 * @returns Contract of an array to the first Contract.
 */
export const arrOf = <T> (contract: Contract<T>): Contract<T[]> =>
	xs =>
		arr(xs)
			.map((elem, i) => {
				try {
					return contract(elem);
				}
				catch (err) {
					if (isValidationError(err)) {
						throw new ErrorAtIndex(i, err);
					}
					else {
						throw err;
					}
				}
			});
;
