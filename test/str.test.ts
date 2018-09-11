import { str, ParmenidesSimpleError } from '../src/parmenides';

describe('`str` contract', () => {
	it('`str(x)` returns `x` when it is a string', () => {
		expect(str('foo')).toBe('foo');
		expect(str('bar')).toBe('bar');
	});

	it('`str(x)` throws ParmenidesSimpleError if `x` is not a string', () => {
		expect(() => str(9 as any)).toThrowError(ParmenidesSimpleError);
		expect(() => str({} as any)).toThrowError(ParmenidesSimpleError);
		expect(() => str(false as any)).toThrowError(ParmenidesSimpleError);
		expect(() => str(undefined as any)).toThrowError(ParmenidesSimpleError);
	});
});
