import { undef } from 'parmenides';

// `undef` will accept only undefined values and will return an undefined

undef(undefined); // $ExpectType undefined
undef(false); // $ExpectError
undef('false'); // $ExpectError
undef(9); // $ExpectError
