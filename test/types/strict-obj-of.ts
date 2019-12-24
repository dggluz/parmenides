import { strictObjOf, str, num } from 'parmenides';

// `strictObjOf` takes a map of contracts and returns a contract that validates the contract of each field.

// Simple strictObjOf
// $ExpectType ContractObjOf<{ foo: Contract<string>; bar: Contract<number>; }>
strictObjOf({
	foo: str,
	bar: num
})({
	foo: 'foo',
	bar: 9
});

// Nested strictObjOf
const result = strictObjOf({
	foo: strictObjOf({
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
strictObjOf({
	foo: str,
	bar: num
})(1); // $ExpectError

// missing properties
strictObjOf({
	foo: str,
	bar: num
})({}); // $ExpectError

// extra properties
strictObjOf({
	foo: str
})({ foo: 'hello!', bar: 9 }); // $ExpectError

// invalid properties' types
strictObjOf({
	foo: str,
	bar: num
})({ foo: 'foo', bar: 'bar' }); // $ExpectError
