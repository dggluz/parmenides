import { Contract } from '../contract';
import { ValidationError, isTypeError } from './parmenides.error';

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

export const isUnionError = isTypeError<ParmenidesUnionError>('UnionError');

/**
 * Error thrown when a value is expected to comply with any of the supplied contracts but it doesn't.
 */
// TODO: remove Parmenides prefix
export class ParmenidesUnionError extends TypeError implements ValidationError {

	kind = 'ValidationError' as const;
	type = 'UnionError';

	/**
	 * @constructor
	 * @param contracts the contracts to check the value with.
	 * @param actualValue the value that doesn't complain any of the contracts.
	 */
	constructor (public contracts: Contract<any>[], public actualValue: unknown) {
		// TODO: add diferent tests and improve the error message
		super(`Expected value to match to any of the contracts, but it didn't: ${
			getContractErrors(contracts, actualValue)
				.join('\n')
		}`);
	}

	explain() {
		return this.message
	}

	eq(error: ValidationError): boolean {
		return isUnionError(error)
			&& this.actualValue === error.actualValue;
		// TODO: compare contracts?
	}
}
