import { contract, Contract } from './contract';

/**
 * Undefined Contract: identity function that throws an error if it is called with something but undefined.
 * @param x undefined
 * @returns undefined.
 */
export const undef: Contract<undefined> = contract('undefined');
