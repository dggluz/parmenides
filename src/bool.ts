import { contract } from './contract';

/**
 * Boolean Contract: identity function that throws an error if it is called with something but a boolean.
 * @param x a boolean
 * @returns x.
 */
export const bool = contract<boolean>('boolean');
