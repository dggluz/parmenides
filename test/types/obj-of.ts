import { objOf, str, num } from 'parmenides';

// `objOf` takes a map of contracts and returns a contract that validates the contract of each field.

// Simple objOf
// $ExpectType ContractOfMap<{ foo: Contract<string>; bar: Contract<number>; }>
objOf({
	foo: str,
	bar: num
})({
	foo: 'foo',
	bar: 9
});

// Nested objOf
const result = objOf({
	foo: objOf({
		bar: str,
		baz: num
	})
})({
	foo: {
		bar: 'bar',
		baz: 1000
	}
});

result.foo.bar; // $ExpectType string
result.foo.baz; // $ExpectType number

// Errors:

// argument is not an object
objOf({
	foo: str,
	bar: num
})(1); // $ExpectError

// missing properties
objOf({
	foo: str,
	bar: num
})({}); // $ExpectError

// invalid properties' types
objOf({
	foo: str,
	bar: num
})({ foo: 'foo', bar: 'bar' }); // $ExpectError
