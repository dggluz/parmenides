import { instanceOf, ParmenidesInstanceOfError } from '../src/parmenides';
import './to-fail-with-contract-error';
describe('`instanceOf` contract builder', () => {
	class Foo {}

	class Bar {}

	const instanceOfFooContract = instanceOf(Foo);

	it('`instanceOf(Foo)(x)` returns `x` when `x` is an instance of Foo', () => {
		const foo = new Foo();
		expect(instanceOfFooContract(foo)).toEqual(foo);
	});

	it('`instanceOf(Foo)(x)` throws ParmenidesInstanceOfError if `x` is not instance of Foo', () => {
		const bar = new Bar();
		const arr = [1, 2, 3];
		const obj = {};
		expect(() => instanceOfFooContract(bar as any)).toFailWithContractError(new ParmenidesInstanceOfError(Foo, bar));
		expect(() => instanceOfFooContract('d' as any)).toFailWithContractError(new ParmenidesInstanceOfError(Foo, 'd'));
		expect(() => instanceOfFooContract(9 as any)).toFailWithContractError(new ParmenidesInstanceOfError(Foo, 9));
		expect(() => instanceOfFooContract(arr as any)).toFailWithContractError(new ParmenidesInstanceOfError(Foo, arr));
		expect(() => instanceOfFooContract(obj as any)).toFailWithContractError(new ParmenidesInstanceOfError(Foo, obj));
		expect(() => instanceOfFooContract(undefined as any)).toFailWithContractError(new ParmenidesInstanceOfError(Foo, undefined));
		expect(() => instanceOfFooContract(null as any)).toFailWithContractError(new ParmenidesInstanceOfError(Foo, null));
	});
});
