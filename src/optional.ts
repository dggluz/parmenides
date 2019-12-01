import { Contract } from './contract';
import { union } from './union';
import { undef } from './undef';
import { isUnionError } from './errors/parmenides-union.error';

/**
 * Makes a contract optional, meaning, the underlying contract or the value `undefined`.
 * Example: `optional(str)` returns a contract to `string | undefined`.
 * Also, see `nullable` to get `string | null`.
 * @param contract The underlying contract
 * @returns A new contract to `undefined` or first contract's values.
 */
export const optional = <T> (contract: Contract<T>) => (x?: T) => {
	if (typeof x === 'undefined') {
		return x;
	}
	return contract(x);
}

