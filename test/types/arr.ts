import { arr } from 'parmenides';

// `arr` accepts only arrays and return them as specific as possible.

arr([]); // $ExpectType never[]
arr([1, 2, 3]); // $ExpectType number[]
arr('Hello!'.split('')); // $ExpectType string[]
arr(1); // $ExpectError
arr('Hello!'); // $ExpectError
