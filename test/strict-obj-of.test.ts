import { str, num, strictObjOf, ParmenidesExtraPropertyError, TypeMismatch, ParmenidesObjOfError } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`strictObjOf` contract', () => {
	const objContract = strictObjOf({
		foo: str,
		bar: num
	});

	it('strictObjOf(ContractMap)(x) should fail if `x` is not an object', () => {
		expect(() =>
			objContract(undefined as any)
		).toFailWithContractError(
			new TypeMismatch('object', undefined)
		);
	});

	it('`strictObjOf(ContractMap)(x)` should fail if `x` is not an object', () => {
		expect(() =>
			objContract('d' as any)
		).toFailWithContractError(
			new TypeMismatch('object', 'd')
		);
	});


	it('`strictObjOf(ContractMap)(x)` should fail if `x` has an extra property', () => {
		expect(() =>
			objContract({
				foo: 'baz',
				bar: 3,
				baz: undefined
			} as any)
		).toFailWithContractError(
			new ParmenidesExtraPropertyError('baz')
		)
	});

	it('`strictObjOf(ContractMap)(ContractMap)` should work as the identity function', () => {
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


	it('`strictObjOf(ContractMap)(x)` should fail if x is missing a property', () => {
		expect(() =>
			objContract({
				foo: 'baz'
			} as any)
		).toFailWithContractError(
			new ParmenidesObjOfError(new TypeMismatch('number', undefined), 'bar')
		);
	});

	it('`strictObjOf(ContractMap)(x)` should fail if any of x\'s properties does not respect its subcontract', () => {
		expect(() =>
			objContract({
				foo: 'baz',
				bar: 'this should not be a string'
			} as any)
		).toFailWithContractError(
			new ParmenidesObjOfError(new TypeMismatch('number', 'this should not be a string'), 'bar')
		);
	});

	it('`strictObjOf(ContractMap)(x)` should fail if any of x\'s properties does not respect its subcontract (non-dottable property name)', () => {
		// Contains prop name
		expect(() =>
			strictObjOf({
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

	it('`strictObjOf(strictObjOf(ContractMap))(x)` (nested strictObjOf) should fail if any of x\'s properties does not respect its subcontract', () => {
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
