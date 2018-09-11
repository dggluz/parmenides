import { instanceOf } from 'parmenides';

// `instanceOf` takes a constructor and returns a Contract to that constructor.
// NOTE: At runtime, an `instanceOf` contract will accept instances of that constructor and return them only,
// but as TS has structural typing, the static checks will not warn us if we use it with an instance of other
// constructor, but that is compatible with the first one.

class Foo {
	Foo = 'Foo';
}

class Bar {
	Bar = 'Bar';
}

const instanceOfFooContract = instanceOf(Foo);

instanceOfFooContract(new Foo()); // $ExpectType Foo

// WARNING: the argument is not a `Foo` instance, but is structurally compatible with it
instanceOfFooContract({ Foo: 'Foo' }); // $ExpectType Foo

instanceOfFooContract(new Bar()); // $ExpectError
instanceOfFooContract('d'); // $ExpectError
instanceOfFooContract(9); // $ExpectError
instanceOfFooContract([1, 2, 3]); // $ExpectError
instanceOfFooContract({}); // $ExpectError
instanceOfFooContract(undefined); // $ExpectError
instanceOfFooContract(null); // $ExpectError
