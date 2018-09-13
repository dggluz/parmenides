import { ParmenidesOneOfError } from './errors/parmenides-one-of-error';
import { memberOf } from './member-of';

export const oneOf = <T extends string | number | boolean> (...validValues: T[]) => {
	return (x: T) => {
		if (!memberOf(x, validValues)) {
			throw new ParmenidesOneOfError(validValues, x);
		}
		return x;
	};
}
