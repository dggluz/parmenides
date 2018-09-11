import { date } from 'parmenides';

// `date` contract expects Date instances and returns them.

date(new Date()); // $ExpectType Date
date(12345); // $ExpectError
date('April 2, 1990'); // $ExpectError
