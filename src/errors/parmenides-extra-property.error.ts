import { ParmenidesError } from './parmenides.error';

export class ParmenidesExtraPropertyError extends ParmenidesError {
	constructor (propertyName: string) {
		super(`Extra property "${propertyName}"`);
	}
}

