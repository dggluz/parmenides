import { nil, TypeMismatch } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`nil` contract', () => {
	it('`nil(x)` returns `x` when it is null', () => {
		expect(nil(null)).toBe(null);
	});

	it('`nil(x)` throws TypeMismatch if `x` is not null', () => {
		const obj = {};
		expect(() => nil(9 as any)).toFailWithContractError(new TypeMismatch('null', 9));
		expect(() => nil(obj as any)).toFailWithContractError(new TypeMismatch('null', obj));
		expect(() => nil('foo' as any)).toFailWithContractError(new TypeMismatch('null', 'foo'));
		expect(() => nil(false as any)).toFailWithContractError(new TypeMismatch('null', false));
		expect(() => nil(undefined as any)).toFailWithContractError(new TypeMismatch('null', undefined));
	});
});
