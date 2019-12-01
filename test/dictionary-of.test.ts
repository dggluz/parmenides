import { str, num, dictionaryOf, objOf, TypeMismatch, ErrorAtProperty } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`dictionaryOf` contract', () => {
	const personContract = objOf({
		name: str,
		age: num
	});

	const dictionaryContract = dictionaryOf(personContract);

	it('dictionaryOf(personContract)(x) throw TypeMismatch if x is not an object', () => {
		expect(() =>
			dictionaryContract(undefined as any)
		).toFailWithContractError(
			new TypeMismatch('object', undefined)
		);
	});

	it('`dictionaryOf(personContract)(contacts)` returns `contacts` when it the contract is respected', () => {
		const contacts = {
			john: {
				name: 'john',
				age: 5
			},
			lane: {
				name: 'lane',
				age: 9
			}
		};
		expect(dictionaryContract(contacts)).toEqual(contacts);
	});

	it('`dictionaryOf(personContract)(x)` throws TypeMismatch if `x` is not an object', () => {
		expect(() => dictionaryContract('d' as any)).toFailWithContractError(new TypeMismatch('object', 'd'));
	});

	it('`dictionaryOf(personContract)(x)` throws ErrorAtProperty if x is missing a property', () => {
		const contacts = {
			john: {
				name: 'john',
			}
		};
		expect(() =>
			dictionaryContract(contacts as any)
		).toFailWithContractError(
			new ErrorAtProperty(
				'john',
				new ErrorAtProperty(
					'age',
					new TypeMismatch('number', undefined)
				)
			)
		);
	});

});
