import { str, num, dictionaryOf, ParmenidesError, objOf } from '../src/parmenides';

describe('`dictionaryOf` contract', () => {
	const personContract = objOf({
		name: str,
		age: num
	});

	const dictionaryContract = dictionaryOf(personContract);

	it('dictionaryOf(personContract)(x) throw ParmenidesError if x is not an object', () => {
		expect(() =>
			dictionaryContract(undefined as any)
		).toThrowError(ParmenidesError as any);
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

	it('`dictionaryOf(personContract)(x)` throws ParmenidesError if `x` is not an object', () => {
		expect(() => dictionaryContract('d' as any)).toThrowError(ParmenidesError as any);
	});

	it('`dictionaryOf(personContract)(x)` throws ParmenidesError if x is missing a property', () => {
		const contacts = {
			john: {
				name: 'john',
			}
		};
		expect(() =>
			dictionaryContract(contacts as any)
		).toThrowError(ParmenidesError as any);
	});

});
