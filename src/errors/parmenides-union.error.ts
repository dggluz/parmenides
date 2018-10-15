import { Contract } from '../contract';
import { ParmenidesError } from './parmenides.error';

/**
 * Checks the received contracts one by time. It returns an array with the error messages
 * of all the concracts that fail.
 * @param contracts the array of contracts to check against.
 * @param value the value to check the contracts with.
 */
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

/**
 * @class
 * Error thrown when a value is expected to comply with any of the supplied contracts but it doesn't.
 */
export class ParmenidesUnionError extends ParmenidesError {
	/**
	 * @constructor
	 * @param contracts the contracts to check the value with. 
	 * @param value the value that doesn't complain any of the contracts.
	 */
	constructor (contracts: Contract<any>[], value: any) {
		super(`Expected value to match to any of the contracts, but it didn't: ${
			getContractErrors(contracts, value)
				.join('\n')
		}`);
	}
}
