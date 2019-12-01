import { obj, TypeMismatch } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`obj` contract', () => {
	it('`obj(x)` returns `x` when it is a object', () => {
		const obj1 = {};
		const obj2 = { foo: 'bar', baz: 2 };
		expect(obj(obj1)).toBe(obj1);
		expect(obj(obj2)).toBe(obj2);
	});

	it('`obj(x)` throws TypeMismatch if `x` is not a object', () => {
		expect(() => obj(9 as any)).toFailWithContractError(new TypeMismatch('object', 9));
		expect(() => obj('foo' as any)).toFailWithContractError(new TypeMismatch('object', 'foo'));
		expect(() => obj(false as any)).toFailWithContractError(new TypeMismatch('object', false));
		expect(() => obj(undefined as any)).toFailWithContractError(new TypeMismatch('object', undefined));
	});
});
