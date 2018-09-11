import { obj } from 'parmenides';

// `obj` will accept only object values and will return an object (as precise as possible)

obj({}); // $ExpectType {}
obj({foo: 'bar'}); // $ExpectType { foo: string; }
obj(true); // $ExpectError
obj('false'); // $ExpectError
obj(9); // $ExpectError
