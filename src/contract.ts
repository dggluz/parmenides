import { ParmenidesSimpleError } from './errors/parmenides-simple.error';

/**
 * A Contract is an identity function that does some checks on the input and throws an error if the checks don't pass.
 */
export type Contract <T> = (x: T) => T;

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

