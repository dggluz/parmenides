import { arrOf, objOf, str, num, strictObjOf } from '../src/parmenides';

describe('Mixing different complex contracts (objOf, arrOf)', () => {
	it('`arrOf(objOf(<any>))(x)` throws a readable error', () => {
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

	it('`objOf(arrOf(<any>))(x)` throws a readable error', () => {
		const objOfArrOf = objOf({
			foo: arrOf(str),
			bar: num
		});
		expect(() => objOfArrOf({
			foo: ['one', 2, 'three'],
			bar: 3
		} as any)).toThrowError('Invalid property obj.foo[1]');
	});

	it('`arrOf(stictObjOf(<any>))(x)` throws a readable error', () => {
		const arrOfStrictObjOf = arrOf(strictObjOf({
			foo: str,
			bar: num
		}));

		expect(() => arrOfStrictObjOf([{
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

	it('`strictObjOf(arrOf(<any>))(x)` throws a readable error', () => {
		const strictObjOfArrOf = strictObjOf({
			foo: arrOf(str),
			bar: num
		});
		expect(() => strictObjOfArrOf({
			foo: ['one', 2, 'three'],
			bar: 3
		} as any)).toThrowError('Invalid property obj.foo[1]');
	});
});
