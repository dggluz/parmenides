import { bool, TypeMismatch } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`bool` contract', () => {
	it('`bool(x)` returns `x` when it is a string', () => {
		expect(bool(false)).toBe(false);
		expect(bool(true)).toBe(true);
	});

	it('`bool(x)` throws TypeMismatch if `x` is a number', () => {
		expect(() => bool(9 as any)).toFailWithContractError(
			new TypeMismatch('boolean', 9)
		);
	});
	it('`bool(x)` throws TypeMismatch if `x` is an object', () => {
		const obj = {};
		expect(() => bool(obj as any)).toFailWithContractError(
			new TypeMismatch('boolean', obj)
		);
	});
	it('`bool(x)` throws TypeMismatch if `x` is a string', () => {
		expect(() => bool('foo' as any)).toFailWithContractError(
			new TypeMismatch('boolean', 'foo')
		);
	});
	it('`bool(x)` throws TypeMismatch if `x` is undefined', () => {
		expect(() => bool(undefined as any)).toFailWithContractError(
			new TypeMismatch('boolean', undefined)
		);
	});
});
