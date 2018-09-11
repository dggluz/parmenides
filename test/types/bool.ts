import { bool } from 'parmenides';

// `bool` will accept only boolean values and will return a boolean

bool(true); // $ExpectType boolean
bool(false); // $ExpectType boolean
bool('false'); // $ExpectError
bool(9); // $ExpectError
