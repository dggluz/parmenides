import { arr, TypeMismatch } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`arr` contract', () => {
	it('`arr(x)` returns `x` when it is an array', () => {
		const arr1 = [];
		const arr2 = [1, 2, 3];
		expect(arr(arr1)).toBe(arr1);
		expect(arr(arr2)).toBe(arr2);
	});

	it('`arr(x)` throws TypeMismatch if `x` is not an array', () => {
		const obj = {};
		expect(() => arr(9 as any)).toFailWithContractError(new TypeMismatch('Array', 9));
		expect(() => arr(obj as any)).toFailWithContractError(new TypeMismatch('Array', obj));
		expect(() => arr(false as any)).toFailWithContractError(new TypeMismatch('Array', false));
		expect(() => arr(undefined as any)).toFailWithContractError(new TypeMismatch('Array', undefined));
	});
});
