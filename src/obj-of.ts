import { Contract, ContractOf } from './contract';
import { obj } from './obj';
import { ParmenidesError } from './errors/parmenides.error';
import { ParmenidesObjOfError } from './errors/parmenides-obj-of.error';

/**
 * @ignore
 */
export type ContractOfMap<T extends MapOfContracts> = {
  [P in keyof T]: ContractOf<T[P]>;
}

export type MapOfContracts = {
  [key: string]: Contract<any>;
}
/**
 * Takes a "map of Contracts" (object that associates keys to Contracts) and returns a Contract to an object for
 * which each key should comply with the corresponding Contract.
 * Example: `objOf({foo: str, bar: num})` returns a Contract to objects with a "foo" property that's
 * a `string` and a "bar" property that's a `number`.
 * Note: `objOf` won't complain about extra properties. For that, see `strictObjOf`.
 * @param contractsMap An object whose values are Contracts
 * @returns Contract to an object which properties should comply with the corresponding Contracts.
 */
export const objOf = <T extends MapOfContracts> (contractsMap: T): Contract<ContractOfMap<T>> => {
	contractsMap = obj(contractsMap);

	return (target: ContractOfMap<T>) => {
		obj(target);
		for (const aContractKey in contractsMap) {
			const aContract = contractsMap[aContractKey];
			const prop = target[aContractKey];
			try {
				aContract(prop);
			} catch (e) {
				if (!(e instanceof ParmenidesError)) {
					throw e;
				}
				throw new ParmenidesObjOfError(e, aContractKey);
			}
		}

		return target;
	};
};
