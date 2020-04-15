import { Contract } from './contract';

/**
 * Takes a contract and returns another contract to `null` or the first contract's values.
 * Example: `nullable(str)` returns a contract to `string | null`.
 * Also, see `optional`.
 * @param contract
 * @returns Contract to `null` or first contract's values.
 */
export const nullable = <T> (contract: Contract<T>): Contract<T | null> => (x: any) => {
	if (x === null) {
		return x;
	}
	return contract(x);
}
