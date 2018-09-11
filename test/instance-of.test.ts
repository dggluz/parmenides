import { instanceOf, ParmenidesInstanceOfError } from '../src/parmenides';
describe('`instanceOf` contract builder', () => {
	class Foo {}

	class Bar {}

	const instanceOfFooContract = instanceOf(Foo);
	
	it('`instanceOf(Foo)(x)` returns `x` when `x` is an instance of Foo', () => {
		const foo = new Foo();
		expect(instanceOfFooContract(foo)).toEqual(foo);
	});

	it('`instanceOf(Foo)(x)` throws ParmenidesInstanceOfError if `x` is not instance of Foo', () => {
		expect(() => instanceOfFooContract(new Bar() as any)).toThrowError(ParmenidesInstanceOfError);
		expect(() => instanceOfFooContract('d' as any)).toThrowError(ParmenidesInstanceOfError);
		expect(() => instanceOfFooContract(9 as any)).toThrowError(ParmenidesInstanceOfError);
		expect(() => instanceOfFooContract([1, 2, 3] as any)).toThrowError(ParmenidesInstanceOfError);
		expect(() => instanceOfFooContract({} as any)).toThrowError(ParmenidesInstanceOfError);
		expect(() => instanceOfFooContract(undefined as any)).toThrowError(ParmenidesInstanceOfError);
		expect(() => instanceOfFooContract(null as any)).toThrowError(ParmenidesInstanceOfError);
	});
});
