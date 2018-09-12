import { objOf, str, num } from 'parmenides';

// `objOf` takes a map of contracts and returns a contract that validates the contract of each field.

// $ExpectType { foo: string; bar: number; }
objOf({
	foo: str,
	bar: num
})({
	foo: 'foo',
	bar: 9
});

objOf({
	foo: str,
	bar: num
})(1); // $ExpectError

objOf({
	foo: str,
	bar: num
})({}); // $ExpectError

objOf({
	foo: str,
	bar: num
})({ foo: 'foo', bar: 'bar' }); // $ExpectError
