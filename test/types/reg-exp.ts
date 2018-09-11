import { regExp } from 'parmenides';

// `regExp` contract expects regular expressions and returns them.

regExp(new RegExp('abc')); // $ExpectType RegExp
regExp(/abc/); // $ExpectType RegExp
regExp(12345); // $ExpectError
regExp('abc'); // $ExpectError
