import { regExp, ParmenidesInstanceOfError } from '../src/parmenides';

describe('`regExp` contract', () => {
	it('`regExp(x)` returns `x` when it is a regular expression', () => {
		const regex1 = new RegExp('');
		const regex2 = /m/;
		expect(regExp(regex1)).toBe(regex1);
		expect(regExp(regex2)).toBe(regex2);
	});

	it('`regExp(x)` throws ParmenidesInstanceOfError if `x` is not an instance of RegExp', () => {
		expect(() => regExp(9 as any)).toThrowError(ParmenidesInstanceOfError);
		expect(() => regExp({} as any)).toThrowError(ParmenidesInstanceOfError);
		expect(() => regExp('foo' as any)).toThrowError(ParmenidesInstanceOfError);
		expect(() => regExp(new Date() as any)).toThrowError(ParmenidesInstanceOfError);
		expect(() => regExp(undefined as any)).toThrowError(ParmenidesInstanceOfError);
	});
});
