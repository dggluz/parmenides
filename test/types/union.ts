import { union, str, num } from 'parmenides';

// `union` takes an arbitrary number of contracts and return a contract that matches against any of them.

const stringOrNumber = union(str, num);

stringOrNumber('hello!'); // $ExpectType string | number
stringOrNumber(9); // $ExpectType string | number
stringOrNumber(false); // $ExpectError
