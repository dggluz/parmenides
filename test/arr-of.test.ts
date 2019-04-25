import { arrOf, str, num, ErrorAtIndex, TypeMismatch, ValidationError, isValidationError, anything } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`arrOf` contract builder', () => {
	it('`arrOf(str)(Array<string>)` should work as the identity function', () => {
		const strArr = ['a', 'b', 'c'];
		expect(arrOf(str)(strArr)).toEqual(strArr);
	});

	it('`arrOf(num)(Array<number>)` should work as the identity function', () => {
		const numArr = [1, 2, 3];
		expect(arrOf(num)(numArr)).toEqual(numArr);
	});

	it('`arrOf(arrOf(num))(Array<Array<number>>)` should work as the identity function', () => {
		const numMatrix = [
			[1, 2, 3],
			[1, 2, 3],
			[1, 2, 3]
		];
		expect(arrOf(arrOf(num))(numMatrix)).toEqual(numMatrix);
	});

	it('`arrOf(anything)(x)` should fail if `x` is not an array', () => {
		expect(
			() => arrOf(anything)('d' as any)
		).toFailWithContractError(
			new TypeMismatch('Array', 'd')
		);
	});

	it('`arrOf(str)(Array<number>)` should fail', () => {
		expect(
			() => arrOf(str)([1, 2, 3] as any)
		).toFailWithContractError(
			new ErrorAtIndex(0, new TypeMismatch('string', 1))
		);
	});

	it('`arrOf(str)(Array<string | number>)` should fail', () => {
		expect(
			() => arrOf(str)(['1', '2', 3, '4', '5'] as any)
		).toFailWithContractError(
			new ErrorAtIndex(2, new TypeMismatch('string', 3))
		);
	});

	it('`arrOf(arrOf(str))(Array<Array<string | number>>)` should fail', () => {
		const arrOfStringsContract = arrOf(arrOf(str));
		expect(() => arrOfStringsContract([
			['1', '2', '3', '4', '5'],
			['1', '2', '3', '4', '5'],
			['1', '2', '3', '4', '5'],
			['1', '2', 3, '4', '5'],
			['1', '2', '3', '4', '5']
		] as any
		)).toFailWithContractError(
			new ErrorAtIndex(3, new ErrorAtIndex(2, new TypeMismatch('string', 3)))
		);
	});


	it('`arrOf(<any>)(x)` does not change thrown error if it is not ParmenidesError', () => {
		const arrContractThatThrowsOtherErrors = arrOf(x => {
			throw SyntaxError('Just fooling around with errors');
		});

		expect(() =>
			arrContractThatThrowsOtherErrors([1, 2, 3] as any)
		).toThrowError(SyntaxError);
	});
});
