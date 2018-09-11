import { ParmenidesNeverError } from './errors/parmenides-never.error';

export const never = (x: never) => {
	throw new ParmenidesNeverError(x);
};
