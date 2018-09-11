import { lit } from 'parmenides';

// `lit` takes a literal value (string, number or boolean) and returns a contract to that literal

lit('foo')('foo'); // $ExpectType "foo"
lit(9)(9); // $ExpectType 9
lit(true)(true); // $ExpectType true
lit(false)(false); // $ExpectType false
lit('foo')('bar'); // $ExpectError
lit(9)(0); // $ExpectError
lit(true)(false); // $ExpectError
lit(false)(true); // $ExpectError
