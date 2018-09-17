import { ParmenidesOneOfError } from './errors/parmenides-one-of-error';

export const oneOf = <T extends string | number | boolean> (...validValues: T[]) => {
	return (x: T) => {
		if (!validValues.includes(x)) {
			throw new ParmenidesOneOfError(validValues, x);
		}
		return x;
	};
}
