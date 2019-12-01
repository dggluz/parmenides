import { str, TypeMismatch } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`str` contract', () => {
	it('`str(x)` returns `x` when it is a string', () => {
		expect(str('foo')).toBe('foo');
		expect(str('bar')).toBe('bar');
	});

	it('`str(x)` throws TypeMismatch if `x` is not a string', () => {
		const obj = {};
		expect(() => str(9 as any)).toFailWithContractError(new TypeMismatch('string', 9));
		expect(() => str(obj as any)).toFailWithContractError(new TypeMismatch('string', obj));
		expect(() => str(false as any)).toFailWithContractError(new TypeMismatch('string', false));
		expect(() => str(undefined as any)).toFailWithContractError(new TypeMismatch('string', undefined));
	});
});
