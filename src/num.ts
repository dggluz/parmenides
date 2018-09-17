import { contract } from './contract';

/**
 * Number Contract: identity function that throws an error if it is called with something but a number.
 * @param x a number
 * @returns x.
 */
export const num = contract<number>('number');
