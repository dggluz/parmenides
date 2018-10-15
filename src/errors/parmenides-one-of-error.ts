import { BasicType } from '../lit';
import { ParmenidesError } from './parmenides.error';

/**
 * @class
 * Error throw when a literal from a set of literals is expected but another value is received.
 */
export class ParmenidesOneOfError <T extends BasicType> extends ParmenidesError {
	/**
	 * @constructor
	 * @param validValues set expected values.
	 * @param actualValue unexpected received value.
	 */
	constructor (validValues: T[], actualValue: any) {
		super(`Expected one of: [${validValues
				.map(x => `"${x.toString()}"`)
				.join(', ')
			}], but the value "${actualValue}" was found.`
		);
	}
}
