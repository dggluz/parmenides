import { contract } from './contract';

/**
 * Object Contract: identity function that throws an error if it is called with something but an object.
 * It doesn't check anything about object's structure, but only that it is an object.
 * For checking object's structure, see `objOf` or `strictObjOf`.
 * @param x an object
 * @returns x.
 */
export const obj = contract('object') as <T extends object> (x: T) => T;
