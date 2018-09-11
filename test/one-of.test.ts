import { oneOf, ParmenidesOneOfError } from '../src/parmenides';

describe('`oneOf` contract builder', () => {
	it('`oneOf(a, b, c)(x)` returns `x` when it is included in [a, b, c]', () => {
		const oneOfAbc = oneOf('a', 'b', 'c');
		expect(oneOfAbc('a')).toBe('a');
		expect(oneOfAbc('c')).toBe('c');
	});

	it('`oneOf(a, b, c)(x)` throws ParmenidesOneOfError if `x` is not included in [a, b, c]', () => {
		const oneOfAbc = oneOf('a', 'b', 'c');
		expect(() => oneOfAbc('d' as any)).toThrowError(ParmenidesOneOfError);
	});
});
