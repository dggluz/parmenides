import { arr, ParmenidesSimpleError } from '../src/parmenides';

describe('`arr` contract', () => {
	it('`arr(x)` returns `x` when it is an array', () => {
		const arr1 = [];
		const arr2 = [1, 2, 3];
		expect(arr(arr1)).toBe(arr1);
		expect(arr(arr2)).toBe(arr2);
	});

	it('`arr(x)` throws ParmenidesSimpleError if `x` is not an array', () => {
		expect(() => arr(9 as any)).toThrowError(ParmenidesSimpleError);
		expect(() => arr({} as any)).toThrowError(ParmenidesSimpleError);
		expect(() => arr(false as any)).toThrowError(ParmenidesSimpleError);
		expect(() => arr(undefined as any)).toThrowError(ParmenidesSimpleError);
	});
});
