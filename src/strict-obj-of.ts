import { objOf, MapOfContracts } from './obj-of';
import { Contract } from './contract';
import { ParmenidesExtraPropertyError } from './errors/parmenides-extra-property.error';

const requireAll = <T> (contractsMap: MapOfContracts<T>, contract: Contract<T>) => {
	const checkAllIncluded = (arrA: string[], arrB: string[]) =>
		arrA.map(anElement => {
			if (!arrB.includes(anElement)) {
				throw new ParmenidesExtraPropertyError(anElement);
			}
			return anElement;
		});

	return (target: T) => {
		const targetKeys = Object.keys(target);
		checkAllIncluded(targetKeys, Object.keys(contractsMap));
		return contract(target);
	};
};

export const strictObjOf = <T> (contractMap: MapOfContracts<T>): Contract<T> =>
	requireAll(contractMap, objOf(contractMap))
;
