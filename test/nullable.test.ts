import { nullable, str, num, TypeMismatch } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`nullable` contract builder', () => {
	it('`nullable(contract)(x)` returns `null` when it is null', () => {
		expect(nullable(str)(null)).toBe(null);
	});

	it('`nullable(contract)(x)` returns `x` when it matches with `contract`', () => {
		expect(nullable(str)('Hello world')).toBe('Hello world');
		expect(nullable(num)(6590)).toBe(6590);
	});

	it('nullable(str)(undefined) fails', () => {
		expect(() => nullable(str)(undefined as any)).toFailWithContractError(new TypeMismatch('string', undefined));
	});

	it('`nullable(x)` throws TypeError if `x` is not null and doesn\'t match with `contract`', () => {
		const obj = {}
		expect(() => nullable(str)(9 as any)).toFailWithContractError(new TypeMismatch('string', 9));
		expect(() => nullable(str)(obj as any)).toFailWithContractError(new TypeMismatch('string', obj));
		expect(() => nullable(str)(false as any)).toFailWithContractError(new TypeMismatch('string', false));
		expect(() => nullable(num)('9' as any)).toFailWithContractError(new TypeMismatch('number', '9'));
		expect(() => nullable(num)(obj as any)).toFailWithContractError(new TypeMismatch('number', obj));
		expect(() => nullable(num)(false as any)).toFailWithContractError(new TypeMismatch('number', false));
  });
});
