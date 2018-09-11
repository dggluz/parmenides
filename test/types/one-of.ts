import { oneOf } from 'parmenides';

// `oneOf` returns a contract to a set of specific possible literal values

oneOf(false, true)(true); // $ExpectType boolean
oneOf(2)(2); // $ExpectType 2
oneOf('hello', 'bye')('bye'); // $ExpectType "hello" | "bye"

oneOf(false, true)(null); // $ExpectError
oneOf(1, 2)('2'); // $ExpectError
oneOf('hello', 'bye')(''); // $ExpectError
