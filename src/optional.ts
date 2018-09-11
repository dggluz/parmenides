import { Contract } from './contract';
import { union } from './union';
import { undef } from './undef';

export const optional = <T> (contract: Contract<T>): (x?: T) => T | undefined =>
	union(contract, undef)
;
