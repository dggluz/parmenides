import { Contract } from './contract';
import { union } from './union';
import { nil } from './nil';

/**
 * Takes a contract and returns another contract to `null` or the first contract's values.
 * Example: `nullable(str)` returns a contract to `string | null`.
 * Also, see `optional`.
 * @param contract
 * @returns Contract to `null` or first contract's values.
 */
export const nullable = <T> (contract: Contract<T>) => union(contract, nil);
