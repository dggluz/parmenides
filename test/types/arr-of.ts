import { arrOf, str, num } from 'parmenides';

// `arrOf` takes a contract of T and returns a contract that expects an array of T.

arrOf(str)(['a', 'b', 'c']); // $ExpectType string[]
arrOf(num)([1, 2, 3]); // $ExpectType number[]
arrOf(arrOf(num))([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); // $ExpectType number[][]
arrOf(str)([1, 2, 3]); // $ExpectError
arrOf(num)(1); // $ExpectError
arrOf(arrOf(num))([1, 2, 3]); // $ExpectError
