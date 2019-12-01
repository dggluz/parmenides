import { num, TypeMismatch } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`num` contract', () => {
	it('`num(x)` returns `x` when it is a number', () => {
		expect(num(3)).toBe(3);
		expect(num(-5)).toBe(-5);
	});

	it('`num(x)` throws TypeMismatch if `x` is not a number', () => {
		const obj = {};
		expect(() => num('foo' as any)).toFailWithContractError(new TypeMismatch('number', 'foo'));
		expect(() => num(obj as any)).toFailWithContractError(new TypeMismatch('number', obj));
		expect(() => num(false as any)).toFailWithContractError(new TypeMismatch('number', false));
		expect(() => num(undefined as any)).toFailWithContractError(new TypeMismatch('number', undefined));
	});
});
