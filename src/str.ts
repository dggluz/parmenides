import { contract } from './contract';

/**
 * String Contract: identity function that throws an error if it is called with something but a string.
 * @param x a string
 * @returns x.
 */
export const str = contract<string>('string');
