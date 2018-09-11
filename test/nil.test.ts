import { nil, ParmenidesSimpleError } from '../src/parmenides';

describe('`nil` contract', () => {
	it('`nil(x)` returns `x` when it is null', () => {
		expect(nil(null)).toBe(null);
	});

	it('`nil(x)` throws ParmenidesSimpleError if `x` is not null', () => {
		expect(() => nil(9 as any)).toThrowError(ParmenidesSimpleError);
		expect(() => nil({} as any)).toThrowError(ParmenidesSimpleError);
		expect(() => nil('foo' as any)).toThrowError(ParmenidesSimpleError);
		expect(() => nil(false as any)).toThrowError(ParmenidesSimpleError);
		expect(() => nil(undefined as any)).toThrowError(ParmenidesSimpleError);
	});
});
