import { Contract } from './contract';
import { union } from './union';
import { undef } from './undef';

/**
 * Takes a contract and returns another contract to `undefined` or the first contract's values.
 * Example: `optional(str)` returns a contract to `string | undefined`.
 * Also, see `nullable`.
 * @param contract
 * @returns Contract to `undefined` or first contract's values.
 */
export const optional = <T> (contract: Contract<T>): (x?: T) => T | undefined =>
	union(contract, undef)
;
