import { lit, ParmenidesSimpleError } from '../src/parmenides';

describe('`lit` contract', () => {
	it('`lit(x)` returns `x` when it is a the expected value', () => {
		expect(lit('foo')('foo')).toBe('foo');
		expect(lit('bar')('bar')).toBe('bar');
		expect(lit(0)(0)).toBe(0);
		expect(lit(9)(9)).toBe(9);
		expect(lit(false)(false)).toBe(false);
		expect(lit(true)(true)).toBe(true);
	});

	it('`lit(x)` throws ParmenidesSimpleError if `x` is not a liting', () => {
		expect(() => lit(9 as any)(0)).toThrowError(ParmenidesSimpleError);
		expect(() => lit('foo' as any)(0)).toThrowError(ParmenidesSimpleError);
		expect(() => lit(false as any)(0)).toThrowError(ParmenidesSimpleError);
	});
});
