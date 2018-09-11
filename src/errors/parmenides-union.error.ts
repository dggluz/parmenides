import { Contract } from '../contract';
import { ParmenidesError } from './parmenides.error';

const getContractErrors = (contracts: Contract<any>[], value: any) =>
	contracts.map(aContract => {
		try {
			aContract(value);
		}
		catch (err) {
			return err.toString();
		}
	})
;


export class ParmenidesUnionError extends ParmenidesError {
	constructor (contracts: Contract<any>[], value: any) {
		super(`Expected value to match to any of the contracts, but it didn't: ${
			getContractErrors(contracts, value)
				.join('\n')
		}`);
	}
}
