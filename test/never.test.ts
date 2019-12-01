import { never, ParmenidesNeverError } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`never` contract', () => {
	it('`never(x)` throws ParmenidesNeverError everytime it\'s called', () => {
		const arr = [1, 2, 3, 4];
		const emptyObj = {};
		const obj = {
			foo: 'foo',
			bar: 10
		};

		expect(() => never(arr as never)).toFailWithContractError(new ParmenidesNeverError(arr));
		expect(() => never(emptyObj as never)).toFailWithContractError(new ParmenidesNeverError(emptyObj));
		expect(() => never(obj as never)).toFailWithContractError(new ParmenidesNeverError(obj));
		expect(() => never(9 as never)).toFailWithContractError(new ParmenidesNeverError(9));
		expect(() => never('foo' as never)).toFailWithContractError(new ParmenidesNeverError('foo'));
		expect(() => never(undefined as never)).toFailWithContractError(new ParmenidesNeverError(undefined));
		expect(() => never(false as never)).toFailWithContractError(new ParmenidesNeverError(false));
		expect(() => never(true as never)).toFailWithContractError(new ParmenidesNeverError(true));
		expect(() => never(null as never)).toFailWithContractError(new ParmenidesNeverError(null));
	});
});
