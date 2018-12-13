import { objOf, MapOfContracts } from './obj-of';
import { Contract } from './contract';
import { ParmenidesExtraPropertyError } from './errors/parmenides-extra-property.error';
import { obj } from './obj';

/**
 * @ignore
 * Internal use function. Returns a contract that checks that all of target's properties are
 * included in the Contract's properties and also delegates to the original contract.
 * @param contractsMap
 * @param contract
 */
const requireAll = <T extends object> (contractsMap: MapOfContracts<T>, contract: Contract<T>) => {
	/**
	 * @ignore
	 * Internal use function. Check that all the elements of arrA are also elements of arrB.
	 * If not, it throws an error.
	 * @param arrA
	 * @param arrB
	 * @returns arrA
	 */
	const checkAllIncluded = (arrA: string[], arrB: string[]) =>
		arrA.map(anElement => {
			if (!arrB.includes(anElement)) {
				throw new ParmenidesExtraPropertyError(anElement);
			}
			return anElement;
		});

	return (target: T) => {
		const targetKeys = Object.keys(obj(target));
		checkAllIncluded(targetKeys, Object.keys(contractsMap));
		return contract(target);
	};
};

/**
 * It's just like `objOf`, but also checks that the object doesn't have extra properties (see `oneOf`).
 * @param contractMap The object with a Contract for each property.
 * @returns Contract that validates an object's properties against each corresponding Contract and also
 * checks that there are not extra properties.
 */
export const strictObjOf = <T extends object> (contractMap: MapOfContracts<T>): Contract<T> =>
	requireAll(contractMap, objOf(contractMap))
;
