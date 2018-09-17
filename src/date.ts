import { instanceOf } from './instance-of';

/**
 * Date Contract: identity function that throws an error if it is called with something but a Date object.
 * @param x a Date object
 * @returns x.
 */
export const date = instanceOf(Date);
