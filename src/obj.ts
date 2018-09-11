import { contract } from './contract';

export const obj = contract('object') as <T extends object> (x: T) => T;

const foo = obj({foo: 'foo'});
