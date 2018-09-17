import { instanceOf } from './instance-of';

/**
 * RegExp Contract: identity function that throws an error if it is called with something but a regular expression.
 * @param x a regular expression
 * @returns x.
 */
export const regExp = instanceOf(RegExp);
