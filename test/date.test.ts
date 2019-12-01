import { date, ParmenidesInstanceOfError } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`date` contract', () => {
	it('`date(x)` returns `x` when it is a date', () => {
		const today = new Date();
		expect(date(today)).toBe(today);
	});

	it('`date(x)` throws ParmenidesInstanceOfError if `x` is not an instance of Date', () => {
		const obj = {};
		expect(() => date(9 as any)).toFailWithContractError(new ParmenidesInstanceOfError(Date, 9));
		expect(() => date(obj as any)).toFailWithContractError(new ParmenidesInstanceOfError(Date, obj));
		expect(() => date('foo' as any)).toFailWithContractError(new ParmenidesInstanceOfError(Date, 'foo'));
		expect(() => date(undefined as any)).toFailWithContractError(new ParmenidesInstanceOfError(Date, undefined));
	});
});
