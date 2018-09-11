import { num, ParmenidesSimpleError } from '../src/parmenides';

describe('`num` contract', () => {
	it('`num(x)` returns `x` when it is a number', () => {
		expect(num(3)).toBe(3);
		expect(num(-5)).toBe(-5);
	});

	it('`num(x)` throws ParmenidesSimpleError if `x` is not a number', () => {
		expect(() => num('foo' as any)).toThrowError(ParmenidesSimpleError);
		expect(() => num({} as any)).toThrowError(ParmenidesSimpleError);
		expect(() => num(false as any)).toThrowError(ParmenidesSimpleError);
		expect(() => num(undefined as any)).toThrowError(ParmenidesSimpleError);
	});
});