import { nil } from 'parmenides';

// `nil` will accept only null values and will return a null

nil(null); // $ExpectType null
nil(false); // $ExpectError
nil('something'); // $ExpectError
nil(9); // $ExpectError
