import { ContractOf, objOf, str, num } from 'parmenides';

const contract = objOf({
    name: str,
    age: num
});

type Person = ContractOf<typeof contract>;

const p1: Person = {name: 'test', age: 1};

// $ExpectType { name: string; age: number; }
p1;

interface Person2 extends ContractOf<typeof contract> {
}

const p2: Person2 = {name: 'test', age: 1};

// $ExpectType Person2
p2;
