import { lit, TypeMismatch } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`lit` contract', () => {
	it('`lit(x)` returns `x` when it is the expected value', () => {
		expect(lit('foo')('foo')).toBe('foo');
		expect(lit('bar')('bar')).toBe('bar');
		expect(lit(0)(0)).toBe(0);
		expect(lit(9)(9)).toBe(9);
		expect(lit(false)(false)).toBe(false);
		expect(lit(true)(true)).toBe(true);
	});

	it('`lit(x)` throws TypeMismatch if `x` is not a liting', () => {
		expect(() => lit(9 as any)(0)).toFailWithContractError(new TypeMismatch("'9'", 0));
		expect(() => lit('foo' as any)(9)).toFailWithContractError(new TypeMismatch("'foo'", 9));
		expect(() => lit(false as any)(true)).toFailWithContractError(new TypeMismatch("'false'", true));
	});
});
