import { ParmenidesSimpleError } from './errors/parmenides-simple.error';

export type Contract <T> = (x: T) => T;
type ContractType = 'string' | 'boolean' | 'object' | 'number' | 'undefined';

export const contract = <T> (type: ContractType): Contract<T> => x => {
    if (typeof x !== type) {
        throw new ParmenidesSimpleError(type, x);
    }
    return x;
};

