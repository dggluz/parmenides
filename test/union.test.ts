import { union, str, num, ParmenidesUnionError, TypeMismatch } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`union` contract builder', () => {
	const unionStrNum = union(str, num);
	it('`union(str, num)(x)` returns `x` when it is a string', () => {
		expect(unionStrNum('a')).toBe('a');
	});

	it('`union(str, num)(x)` returns `x` when it is a number', () => {
		expect(unionStrNum(3)).toBe(3);
	});

	it('`union(str, num)(x)` throws ParmenidesUnionError if `x` is not a number nor a string', () => {
		expect(() => unionStrNum(true as any)).toFailWithContractError(
			new ParmenidesUnionError([str, num], [
				new TypeMismatch('string', true),
				new TypeMismatch('number', true),
			], true)
		);
	});

	it('`union(str, num)(x)` throws ParmenidesUnionError that should have a general message', () => {
		expect(() => unionStrNum(true as any)).toThrowError('Expected value to match to any of the contracts, but it didn\'t');
	});

	it('`union(str, num)(x)` throws ParmenidesUnionError that refers to actual type', () => {
		expect(() => unionStrNum(true as any)).toThrowError('boolean');
	});

	it('`union(str, num)(x)` throws ParmenidesUnionError that includes subcontract errors', () => {
		expect(() => unionStrNum(true as any)).toThrowError('string');
		expect(() => unionStrNum(true as any)).toThrowError('number');
	});

	it('`union(ContractMap)(x)` does not change thrown error if it is not a ParmenidesUnionError', () => {
		const unionThatThrowsSyntaxError = union(
			str,
			x => {
				throw SyntaxError('Just fooling around with errors');
			}
		);

		expect(() =>
			unionThatThrowsSyntaxError(9 as any)
		).toThrowError(SyntaxError);
	});
});
