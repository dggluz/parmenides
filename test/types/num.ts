import { num } from 'parmenides';

// `num` will accept only number values and will return a number

num(10); // $ExpectType number
num('something'); // $ExpectError
num(false); // $ExpectError
