import { date, ParmenidesInstanceOfError } from '../src/parmenides';

describe('`date` contract', () => {
	it('`date(x)` returns `x` when it is a date', () => {
		const today = new Date();
		expect(date(today)).toBe(today);
	});

	it('`date(x)` throws ParmenidesInstanceOfError if `x` is not an instance of Date', () => {
		expect(() => date(9 as any)).toThrowError(ParmenidesInstanceOfError);
		expect(() => date({} as any)).toThrowError(ParmenidesInstanceOfError);
		expect(() => date('foo' as any)).toThrowError(ParmenidesInstanceOfError);
		expect(() => date(new Date().getTime() as any)).toThrowError(ParmenidesInstanceOfError);
		expect(() => date(undefined as any)).toThrowError(ParmenidesInstanceOfError);
	});
});
