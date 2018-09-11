import { undef, ParmenidesSimpleError } from '../src/parmenides';

describe('`undef` contract', () => {
	it('`undef(x)` returns `x` when it is undefined', () => {
		expect(undef(undefined)).toBe(undefined);
	});

	it('`undef(x)` throws ParmenidesSimpleError if `x` is not undefined', () => {
		expect(() => undef(9 as any)).toThrowError(ParmenidesSimpleError);
		expect(() => undef({} as any)).toThrowError(ParmenidesSimpleError);
		expect(() => undef('foo' as any)).toThrowError(ParmenidesSimpleError);
		expect(() => undef(false as any)).toThrowError(ParmenidesSimpleError);
	});
});
