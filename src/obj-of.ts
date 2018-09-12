import { Contract } from './contract';
import { obj } from './obj';
import { ParmenidesError } from './errors/parmenides.error';
import { ParmenidesObjOfError } from './errors/parmenides-obj-of.error';

export type MapOfContracts<T> = {
	[P in keyof T]: Contract<T[P]>;
};

export const objOf = <T> (contractsMap: MapOfContracts<T>): Contract<T> => {
	contractsMap = obj(contractsMap);

	return (target: T) => {
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
