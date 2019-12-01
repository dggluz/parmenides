import { undef, TypeMismatch } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`undef` contract', () => {
	it('`undef(x)` returns `x` when it is undefined', () => {
		expect(undef(undefined)).toBe(undefined);
	});

	it('`undef(x)` throws TypeMismatch if `x` is not undefined', () => {
		const obj = {};
		expect(() => undef(9 as any)).toFailWithContractError(new TypeMismatch('undefined', 9));
		expect(() => undef(obj as any)).toFailWithContractError(new TypeMismatch('undefined', obj));
		expect(() => undef('foo' as any)).toFailWithContractError(new TypeMismatch('undefined', 'foo'));
		expect(() => undef(false as any)).toFailWithContractError(new TypeMismatch('undefined', false));
	});
});
