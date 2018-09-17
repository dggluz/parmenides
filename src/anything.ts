/**
 * Just an identity function that will never throw an error. Its static type will be inferred from
 * the value if possible or will default to any.
 * @param x 
 */
export const anything = <T = any> (x: T) => x;
