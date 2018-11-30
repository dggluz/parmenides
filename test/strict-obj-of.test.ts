import { str, num, strictObjOf, ParmenidesError } from '../src/parmenides';

describe('`strictObjOf` contract', () => {
	const objContract = strictObjOf({
		foo: str,
		bar: num
	});

	it('strictObjOf(ContractMap)(x) throw ParmenidesError if x is not an object', () => {
        expect(() =>
            objContract(undefined as any)
        ).toThrowError(ParmenidesError as any);
	});

    it('`strictObjOf(ContractMap)(x)` throws ParmenidesError if x has extra properties', () => {
        expect(() =>
            objContract({
                foo: 'baz',
                bar: 3,
                baz: undefined
            } as any)
        ).toThrowError(ParmenidesError as any);
    });

	it('`strictObjOf(ContractMap)(x)` returns `x` when it is `x` corresponds with ContractMap', () => {
		const obj = {
			foo: 'baz',
			bar: 5
		};
		expect(objContract(obj)).toEqual(obj);
	});

	it('`strictObjOf(strictObjOf(ContractMap))(x)` (nested `strictObjOf`) returns `x` when it is `x` corresponds with ContractMap', () => {
		const nestedstrictObjOf = strictObjOf({
			foo: strictObjOf({
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

		expect(nestedstrictObjOf(obj)).toEqual(obj);
	});

	it('`strictObjOf(ContractMap)(x)` throws ParmenidesError if `x` is not an object', () => {
		expect(() => objContract('d' as any)).toThrowError(ParmenidesError as any);
	});

	it('`strictObjOf(ContractMap)(x)` throws ParmenidesError if x is missing a property', () => {
		expect(() =>
			objContract({
				foo: 'baz'
			} as any)
		).toThrowError(ParmenidesError as any);
	});

	it('`strictObjOf(ContractMap)(x)` throws ParmenidesError if any of x\'s properties does not respect its subcontract', () => {
		expect(() =>
			objContract({
				foo: 'baz',
				bar: 'this should not be a string'
			} as any)
		).toThrowError(ParmenidesError as any);
	});

	it('`strictObjOf(ContractMap)(x)` throws error with useful information when failing because of subcontract', () => {
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

	it('`strictObjOf(ContractMap)(x)` throws error with useful information when failing because of subcontract (non-dottable property name)', () => {
		// Contains prop name
		expect(() =>
			strictObjOf({
				foo: str,
				'0bar': num
			})({
				foo: 'baz',
				'0bar': 'hakuna matata'
			} as any)
		).toThrowError("Invalid property obj['0bar']:");
	});

	it('`strictObjOf(strictObjOf(ContractMap))(x)` (nested strictObjOf) throws error with useful information when failing because of subcontract', () => {
		expect(() =>
			strictObjOf({
				foo: strictObjOf({
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

	it('`strictObjOf(ContractMap)(x)` does not change thrown error if it is not ParmenidesError', () => {
		const objContractThatThrowsOtherErrors = strictObjOf({
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
