import { never } from 'parmenides';

// `never` will accept only "never" values (should actually be never called).
// If it is called it will throw an error.

never(undefined as never); // $ExpectType never
never(undefined); // $ExpectError
never(false); // $ExpectError
never('something'); // $ExpectError
never(9); // $ExpectError
