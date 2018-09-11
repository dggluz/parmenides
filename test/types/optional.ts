import { optional, str } from 'parmenides';

// `optional` function takes a contract and returns another contract that matches if the
// first contract matchers or if the argument is undefined

optional(str)('Hello!'); // $ExpectType string | undefined
optional(str)(undefined); // $ExpectType string | undefined
optional(str)(9); // $ExpectError
