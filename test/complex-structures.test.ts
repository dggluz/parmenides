import { arrOf, objOf, str, num } from '../src/parmenides';

describe('Mixing different complex contracts (objOf, arrOf)', () => {
	it('`arrOf(<any>)(x)` throws a readable error 1', () => {
		const arrOfObjOf = arrOf(objOf({
			foo: str,
			bar: num
		}));

		expect(() => arrOfObjOf([{
			foo: 'foo',
			bar: 3
		}, {
			foo: 'foo',
			bar: 3
		}, {
			foo: 'foo',
			bar: 3
		}, {
			foo: 'foo',
			bar: '3'
		}, {
			foo: 'foo',
			bar: 3
		}, {
			foo: 'foo',
			bar: 3
		}] as any)).toThrowError('Invalid element arr[3].bar:');
	});

		
	it('`arrOf(<any>)(x)` throws a readable error 2', () => {
		const objOfArrOf = objOf({
			foo: arrOf(str),
			bar: num
		});
		expect(() => objOfArrOf({
			foo: ['one', 2, 'three'],
			bar: 3
		} as any)).toThrowError('Invalid property obj.foo[1]');
	});
});
