import { str, num, objOf, ParmenidesError } from '../src/parmenides';

describe('`objOf` contract', () => {
	const objContract = objOf({
		foo: str,
		bar: num
	});

	it('`objOf(ContractMap)(x)` returns `x` when it is `x` corresponds with ContractMap', () => {
		const obj = {
			foo: 'baz',
			bar: 5
		};
		expect(objContract(obj)).toEqual(obj);
	});

	it('`objOf(objOf(ContractMap))(x)` (nested `objOf`) returns `x` when it is `x` corresponds with ContractMap', () => {
		const nestedObjOf = objOf({
			foo: objOf({
				bar: str,
				baz: num
			})
		});

		const obj = {
			foo: {
				bar: 'bar',
				baz: 1000
			}
		};

		expect(nestedObjOf(obj)).toEqual(obj);
	});

	it('`objOf(ContractMap)(x)` throws ParmenidesError if `x` is not an object', () => {
		expect(() => objContract('d' as any)).toThrowError(ParmenidesError as any);
	});

	it('`objOf(ContractMap)(x)` throws ParmenidesError if x is missing a property', () => {
		expect(() =>
			objContract({
				foo: 'baz'
			} as any)
		).toThrowError(ParmenidesError as any);
	});

	it('`objOf(ContractMap)(x)` throws ParmenidesError if any of x\'s properties does not respect its subcontract', () => {
		expect(() =>
			objContract({
				foo: 'baz',
				bar: 'this should not be a string'
			} as any)
		).toThrowError(ParmenidesError as any);
	});

	it('`objOf(ContractMap)(x)` throws error with useful information when failing because of subcontract', () => {
		// Contains prop name
		expect(() =>
			objContract({
				foo: 'baz',
				bar: 'hakuna matata'
			} as any)
		).toThrowError('Invalid property obj.bar:');

		// The following `expect`s check the `num` contract errors
		// Contains prop value
		expect(() =>
			objContract({
				foo: 'baz',
				bar: 'hakuna matata'
			} as any)
		).toThrowError('hakuna matata');

		// Contains actual type
		expect(() =>
			objContract({
				foo: 'baz',
				bar: 'hakuna matata'
			} as any)
		).toThrowError('string');

		// Contains expected type
		expect(() =>
			objContract({
				foo: 'baz',
				bar: 'hakuna matata'
			} as any)
		).toThrowError('number');
	});

	it('`objOf(ContractMap)(x)` throws error with useful information when failing because of subcontract (non-dottable property name)', () => {
		// Contains prop name
		expect(() =>
			objOf({
				foo: str,
				'0bar': num
			})({
				foo: 'baz',
				'0bar': 'hakuna matata'
			} as any)
		).toThrowError("Invalid property obj['0bar']:");
	});

	it('`objOf(objOf(ContractMap))(x)` (nested objOf) throws error with useful information when failing because of subcontract', () => {
		expect(() =>
			objOf({
				foo: objOf({
					bar: str,
					baz: num
				})
			})({
				foo: {
					bar: 'bar',
					baz: 'baz'
				}
			} as any)
		).toThrowError('Invalid property obj.foo.baz:');
	});

	it('`objOf(ContractMap)(x)` does not change thrown error if it is not ParmenidesError', () => {
		const objContractThatThrowsOtherErrors = objOf({
			foo: str,
			bar: x => {
				throw SyntaxError('Just fooling around with errors');
			}
		});

		expect(() =>
			objContractThatThrowsOtherErrors({
				foo: 'baz',
				bar: 3
			} as any)
		).toThrowError(SyntaxError);
	});
});
