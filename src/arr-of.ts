import { Contract } from './contract';
import { arr } from './arr';
import { ParmenidesError } from './errors/parmenides.error';
import { ParmenidesArrOfError } from './errors/parmenides-arr-of.error';

export const arrOf = <T> (contract: Contract<T>): Contract<T[]> =>
	xs =>
		arr(xs)
			.map((elem, i) => {
				try {
					return contract(elem);
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
