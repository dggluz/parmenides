import { str, num, objOf, TypeMismatch, ParmenidesObjOfError } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`objOf` contract', () => {
	const objContract = objOf({
		foo: str,
		bar: num
	});

	it('objOf(ContractMap)(x) should fail if `x` is not an object', () => {
		expect(() =>
			objContract(undefined as any)
		).toFailWithContractError(
			new TypeMismatch('object', undefined)
		);
	});

	it('objOf(ContractMap)(x) should fail if `x` is not an object', () => {
		expect(
			() => objContract('d' as any)
		).toFailWithContractError(
			new TypeMismatch('object', 'd')
		);
	});

	it('`objOf(ContractMap)(x)` returns `x` when it is `x` corresponds with ContractMap', () => {
		const obj = {
			foo: 'baz',
			bar: 5
		};
		expect(objContract(obj)).toEqual(obj);
	});

	it('`objOf(objOf(ContractMap))(x)` (nested `objOf`) should work as the identity function', () => {
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



	it('`objOf(ContractMap)(x)` should fail if x is missing a property', () => {
		expect(() =>
			objContract({
				foo: 'baz'
			} as any)
		).toFailWithContractError(
			new ParmenidesObjOfError(new TypeMismatch('number', undefined), 'bar')
		);
	});

	it('`objOf(ContractMap)(x)` should fail if any of x\'s properties does not respect its subcontract', () => {
		expect(() =>
			objContract({
				foo: 'baz',
				bar: 'this should not be a string'
			} as any)
		).toFailWithContractError(
			new ParmenidesObjOfError(new TypeMismatch('number', 'this should not be a string'), 'bar')
		);
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
		).toFailWithContractError(
			new ParmenidesObjOfError(new TypeMismatch('number', 'hakuna matata'), '0bar')
		);
	});

	it('`objOf(objOf(ContractMap))(x)` (nested objOf) should fail when a subcontract fails', () => {
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
		).toFailWithContractError(
			new ParmenidesObjOfError(
				new ParmenidesObjOfError(
					new TypeMismatch('number', 'baz'),
					'baz'
				),
				'foo'
			)
		);
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
