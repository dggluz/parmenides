import { Contract } from './contract';
import { union } from './union';
import { nil } from './nil';

export const nullable = <T> (contract: Contract<T>) => union(contract, nil);
