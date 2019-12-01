import { arrOf, objOf, str, num, strictObjOf, ErrorAtIndex, TypeMismatch, ErrorAtProperty } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('Mixing different complex contracts (objOf, arrOf)', () => {
	it('`arrOf(objOf(<any>))(x)` throws a mixed error', () => {
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
		}] as any)).toFailWithContractError(
			new ErrorAtIndex(3,
				new ErrorAtProperty(
					'bar',
					new TypeMismatch('number', '3')
				)
			)
		);
	});

	it('`objOf(arrOf(<any>))(x)` throws a readable error', () => {
		const objOfArrOf = objOf({
			foo: arrOf(str),
			bar: num
		});
		expect(() => objOfArrOf({
			foo: ['one', 2, 'three'],
			bar: 3
		} as any)).toFailWithContractError(
			new ErrorAtProperty(
				'foo',
				new ErrorAtIndex(1,
					new TypeMismatch('string', 2),
				)
			)
		);
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
		}] as any)).toFailWithContractError(
			new ErrorAtIndex(3,
				new ErrorAtProperty(
					'bar',
					new TypeMismatch('number', '3')
				),
			)
		);
	});

	it('`strictObjOf(arrOf(<any>))(x)` throws a readable error', () => {
		const strictObjOfArrOf = strictObjOf({
			foo: arrOf(str),
			bar: num
		});
		expect(() => strictObjOfArrOf({
			foo: ['one', 2, 'three'],
			bar: 3
		} as any)).toFailWithContractError(
			new ErrorAtProperty(
				'foo',
				new ErrorAtIndex(1,
					new TypeMismatch('string', 2),
				)
			)
		);
	});
});
