import { instanceOf } from './instance-of';
import { Contract } from './contract';

/**
 * RegExp Contract: identity function that throws an error if it is called with something but a regular expression.
 * @param x a regular expression
 * @returns x.
 */
export const regExp: Contract<RegExp> = instanceOf(RegExp);
