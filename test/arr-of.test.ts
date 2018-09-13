import { arrOf, str, num, ParmenidesError } from '../src/parmenides';

describe('`arrOf` contract builder', () => {
	it('`arrOf(<string>)(x)` returns `x` when it is `x` an array of strings', () => {
		const arrOfStringsContract = arrOf(str);
		const strArr = ['a', 'b', 'c'];
		expect(arrOfStringsContract(strArr)).toEqual(strArr);
	});

	it('`arrOf(<number>)(x)` returns `x` when it is `x` an array of numbers', () => {
		const arrOfNumbersContract = arrOf(num);
		const numArr = [1, 2, 3];
		expect(arrOfNumbersContract(numArr)).toEqual(numArr);
	});

	it('`arrOf(arrOf(<number>))(x)` returns `x` when it is `x` a matrix of numbers', () => {
		const matrixOfNumbersContract = arrOf(arrOf(num));
		const numMatrix = [
			[1, 2, 3],
			[1, 2, 3],
			[1, 2, 3]
		];
		expect(matrixOfNumbersContract(numMatrix)).toEqual(numMatrix);
	});

	it('`arrOf(<any>)(x)` throws ParmenidesError if `x` is not an array', () => {
		const arrOfStringsContract = arrOf(str);
		expect(() => arrOfStringsContract('d' as any)).toThrowError(ParmenidesError as any);
	});

	it('`arrOf(<any>)(x)` throws ParmenidesError if `x` is an array of different type', () => {
		const arrOfStringsContract = arrOf(str);
		expect(() => arrOfStringsContract([1, 2, 3] as any)).toThrowError(
			ParmenidesError as any
		);
	});

	it('`arrOf(<any>)(x)` error is expressive', () => {
		const arrOfStringsContract = arrOf(str);
		expect(() => arrOfStringsContract(['1', '2', 3, '4', '5'] as any)).toThrowError('Invalid element arr[2]:');
	});

	it('`arrOf(arrOf(<any>))(x)` error is expressive', () => {
		const arrOfStringsContract = arrOf(arrOf(str));
		expect(() => arrOfStringsContract([
			['1', '2', '3', '4', '5'],
			['1', '2', '3', '4', '5'],
			['1', '2', '3', '4', '5'],
			['1', '2', 3, '4', '5'],
			['1', '2', '3', '4', '5']
		] as any)).toThrowError('Invalid element arr[3][2]:');
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
