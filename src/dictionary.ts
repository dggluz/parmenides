import { Contract } from "./contract";
import { ErrorAtProperty } from "./errors/parmenides-obj-of.error";
import { obj } from "./obj";


export type Dictionary<T> = Record<string, T>;

/**
 * Function that takes a Contract and returns another Contract for a dictionary where all the elements
 * should comply with first Contract.
 * Example: `dictionaryOf(bool)` will return a Contract to a `{[key: string]: boolean}`.
 * @param contract the Contract the elements should comply to.
 * @returns Contract of an object to the first Contract.
 */
export const dictionaryOf = <T>(contract: Contract<T>): Contract<Dictionary<T>> => {
	return (dictionary: Dictionary<T>) => {
		// First check that dictionary is an object
		obj(dictionary);
		// Then for all keys, check it respects the contract
		for (const key in dictionary) {
			try {
				contract(dictionary[key]);
			} catch (e) {
				throw new ErrorAtProperty(e, key);
			}
		}
		return dictionary;
	};
};
