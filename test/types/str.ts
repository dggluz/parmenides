import { str } from 'parmenides';

// `str` will accept only string values and will return a string

str('something'); // $ExpectType string
str(10); // $ExpectError
str(false); // $ExpectError
