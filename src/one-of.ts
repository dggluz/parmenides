import { ParmenidesOneOfError } from './errors/parmenides-one-of-error';

const memberOf = <T>(element: T, arr: T[]) => arr.indexOf(element) !== -1;

export const oneOf = <T extends string | number | boolean> (...validValues: T[]) => {
	return (x: T) => {
		if (!memberOf(x, validValues)) {
			throw new ParmenidesOneOfError(validValues, x);
		}
		return x;
	};
}
