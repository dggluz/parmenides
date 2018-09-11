import { optional, str, ParmenidesError } from '../src/parmenides';

describe('`optional` contract builder', () => {
	it('`optional(contract)(x)` returns `x` when it is a undefined', () => {
		expect(optional(str)(undefined)).toBe(undefined);
	});
	it('`optional(contract)(x)` returns `x` when it matches with `contract`', () => {
		expect(optional(str)('Hello world')).toBe('Hello world');
	});

	it('`undef(x)` throws ParmenidesError if `x` is not a undefined and doesn\'t match with `contract`', () => {
		expect(() => optional(str)(9 as any)).toThrowError(ParmenidesError as any);
		expect(() => optional(str)({} as any)).toThrowError(ParmenidesError as any);
		expect(() => optional(str)(false as any)).toThrowError(ParmenidesError as any);
	});
});
