import { BasicType } from '../lit';
import { ParmenidesError } from './parmenides.error';

export class ParmenidesOneOfError <T extends BasicType> extends ParmenidesError {
	constructor (validValues: T[], actualValue: any) {
		super(`Expected one of: [${validValues
				.map(x => `"${x.toString()}"`)
				.join(', ')
			}], but the value "${actualValue}" was found.`
		);
	}
}
