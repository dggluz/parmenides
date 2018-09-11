import { ParmenidesSimpleError } from './errors/parmenides-simple-error';

export type BasicType = string | number | boolean;

export const lit = <T extends BasicType> (expectedValue: T) =>
	(x: T) => {
		if (x !== expectedValue) {
			throw new ParmenidesSimpleError(`'${expectedValue}'`, x);
		}
		return x;
	}
;
