import { date, ParmenidesInstanceOfError, TypeMismatch, ErrorAtProperty, ErrorAtIndex } from '../src/parmenides';

describe('`error` messages', () => {
	it('Type Mismatch', () => {
		const error = new TypeMismatch('string', 9);
		const msg = 'string expected, but number was found (with value "9").';
		expect(error.explain()).toBe(msg);
	});

	describe('ErrorAtProperty', () => {
		it('Simple property', () => {
			const error =
				new ErrorAtProperty(
					'id',
					new TypeMismatch('number', 'hello')
				)
			;
			const msg = 'property "id" was expected to be of type "number", but is of type "string" (with value "hello")';
			expect(error.explain()).toBe(msg);
		});
		it('Anidated property', () => {
			const error =
				new ErrorAtProperty(
					'user',
					new ErrorAtProperty(
						'address',
						new ErrorAtProperty(
							'number',
							new TypeMismatch('string', 9)
						)
					)
				)
			;
			const msg = 'property "user.address.number" was expected to be of type "string", but is of type "number" (with value "9")';
			expect(error.explain()).toBe(msg);
		});

		it('Anidated property and index', () => {
			const error =
				new ErrorAtProperty(
					'user',
					new ErrorAtProperty(
						'address',
						new ErrorAtIndex(
							0,
							new TypeMismatch('string', 9)
						)
					)
				)
			;
			const msg = 'property "user.address[0]" was expected to be of type "string", but is of type "number" (with value "9")';
			expect(error.explain()).toBe(msg);
		});

		it('Undefined property', () => {
			const error =
				new ErrorAtProperty(
					'user',
					new TypeMismatch('string', undefined)
				)
			;
			const msg = 'property "user" was expected to be of type "string", but is undefined';
			expect(error.explain()).toBe(msg);
		})

	});

	describe('ErrorAtIndex', () => {
		it('Simple index', () => {
			const error =
				new ErrorAtIndex(
					0,
					new TypeMismatch('string', 9)
				)
			;
			const msg = 'element of the array at position [0] was expected to be of type "string", but is of type "number" (with value "9")';
			expect(error.explain()).toBe(msg);
		});
		it('Anidated index', () => {
			const error =
				new ErrorAtIndex(
					2,
					new ErrorAtIndex(
						2,
						new TypeMismatch('string', 9)
					)
				)
			;
			const msg = 'element of the array at position [2][2] was expected to be of type "string", but is of type "number" (with value "9")';
			expect(error.explain()).toBe(msg);
		});

		// TODO: Add ParmenidesUnionError
		// new ParmenidesUnionError([str, num], [
		// 		new TypeMismatch('string', true),
		// 		new TypeMismatch('number', true),
		// 	], true)
		// TODO: Add ParmenidesUnionError with literals

		// FIX
		// Expected message: TypeError: null expected, but object was found (with value "[object Object]").
		// new TypeMismatch('null', {})
		// use: JSON.stringify(obj)

		// new ParmenidesInstanceOfError(Foo, new Bar())
		// InstanceOfError: An instance of Foo was expected, but object was found (with value "[object Object]").

		// new ParmenidesInstanceOfError(Foo, [1, 2, 3])
		// InstanceOfError: An instance of Foo was expected, but object was found (with value "1,2,3").

		// In undef we have this:
		// TypeMismatch: undefined expected, but number was found (with value "9").
		// Maybe create its own type?

		// new ParmenidesNeverError(arr)
		// Expected to never happened, but object was found (with value "1,2,3,4").

		// expect(() => nullable(str)(undefined as any)).toFailWithContractError(new TypeMismatch('string', undefined));
		// TypeMismatch: string expected, but undefined was found (with value "undefined").
	});


});
