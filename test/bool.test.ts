import { bool, ParmenidesSimpleError } from '../src/parmenides';

describe('`bool` contract', () => {
    it('`bool(x)` returns `x` when it is a string', () => {
        expect(bool(false)).toBe(false);
        expect(bool(true)).toBe(true);
    });

    it('`bool(x)` throws ParmenidesSimpleError if `x` is not a boolean', () => {
        expect(() => bool(9 as any)).toThrowError(ParmenidesSimpleError);
        expect(() => bool({} as any)).toThrowError(ParmenidesSimpleError);
        expect(() => bool('foo' as any)).toThrowError(ParmenidesSimpleError);
        expect(() => bool(undefined as any)).toThrowError(ParmenidesSimpleError);
    });

    it('`bool(x)` throws a readable error', () => {
        expect(() => bool(9 as any)).toThrowError('boolean expected, but number was found (with value "9").');
    });
});
