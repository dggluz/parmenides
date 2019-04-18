import { ParmenidesSimpleError } from './errors/parmenides-simple.error';

/**
 * A Contract is an identity function that does some checks on the input and throws an error if the checks don't pass.
 */
export type Contract <T> = (x: T) => T;

/**
 * A Mapper is a function that check its input and throws an error if the checks don't pass but also transforms its input
 * Mapper function type
 */
export type Mapper <A, B> = (x: A) => B;

/**
 * A type function helper to allow extracting the type a contract is validating
 */
export type ContractOf <T extends Contract<any>> = T extends Contract<infer C> ? C : never;

/**
 * @ignore
 */
export type ContractType = 'string' | 'boolean' | 'object' | 'number' | 'undefined';

/**
 * Utility function to construct basic contracts. Receives the expected type
 * (must be JavaScript primitive type) and returns a contract to that type.
 * @param type must be: 'string', 'boolean', 'object', 'number' or 'undefined'.
 * @returns A Contract to that type.
 */
export const contract = <T> (type: ContractType): Contract<T> => x => {
	if (typeof x !== type) {
		throw new ParmenidesSimpleError(type, x);
	}
	return x;
};

