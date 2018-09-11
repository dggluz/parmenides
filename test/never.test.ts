import { never, ParmenidesNeverError } from '../src/parmenides';

describe('`never` contract', () => {
	it('`never(x)` throws ParmenidesNeverError everytime it\'s called', () => {
		expect(() => never(9 as never)).toThrowError(ParmenidesNeverError);
		expect(() => never({} as never)).toThrowError(ParmenidesNeverError);
		expect(() => never('foo' as never)).toThrowError(ParmenidesNeverError);
		expect(() => never(undefined as never)).toThrowError(ParmenidesNeverError);
		expect(() => never(false as never)).toThrowError(ParmenidesNeverError);
		expect(() => never(true as never)).toThrowError(ParmenidesNeverError);
		expect(() => never([1, 2, 3, 4] as never)).toThrowError(ParmenidesNeverError);
		expect(() => never({
			foo: 'foo',
			bar: 10
		} as never)).toThrowError(ParmenidesNeverError);
		expect(() => never(null as never)).toThrowError(ParmenidesNeverError);
	});
});
