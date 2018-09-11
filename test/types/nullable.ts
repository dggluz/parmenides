import { nullable, str } from 'parmenides';

// `nullable` function takes a contract and returns another contract that matches if the
// first contract matchers or if the argument is null

nullable(str)('Hello!'); // $ExpectType string | null
nullable(str)(null); // $ExpectType string | null
nullable(str)(9); // $ExpectError
