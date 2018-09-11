import { ParmenidesError } from './parmenides-error';

export type Constructor <T> = {
	new(...args: any[]): T;
};

export class ParmenidesInstanceOfError <T> extends ParmenidesError {
	constructor (constructor: Constructor<T>, actualValue: any) {
		super(`An instance of ${constructor.name} was expected, but ${typeof actualValue} was found (with value "${actualValue}").`);
	}
}
