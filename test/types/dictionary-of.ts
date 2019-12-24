import { dictionaryOf } from 'parmenides';
import { personContract } from './contract';

const contactsContract = dictionaryOf(personContract);

const contacts = contactsContract({
	john: { name: 'john', age: 27},
	jane: { name: 'jane', age: 27}
});

// $ExpectType Record<string, ContractOfMap<{ name: Contract<string>; age: Contract<number>; }>>
contacts;
