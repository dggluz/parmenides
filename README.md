# Parmenides
[![Build Status](https://travis-ci.org/dggluz/parmenides.svg?branch=master)](https://travis-ci.org/dggluz/parmenides)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

> TypeScript library that performs dynamic type checking

TypeScript is great. It warns you of static type errors and hence earns you lots of time and headaches. But your program probably have entrypoints (network requests, file readings, etc.) that can not be trusted completely.

For instance, supose you read some configuration from a `JSON` file:

```typescript
import { readFile } from 'fs';

interface AwsConfig {
    // definitions...
};

readFile('./my-aws-config.json', { encoding: 'utf8' }, (err, awsConfigStr) => {
    if (err) {
        console.error(err);
        return;
    }
    const awsConfig: AwsConfig = JSON.parse(awsConfigStr);
});
```

In this example, TypeScript can not prevent errors if the read JSON doesn't have an expected property. These are some cases this library was created for.

## Features

- Infers typings.
- Very lightweight (under 4kb without minifying).
- Expressive errors.
- Works both client and server-side.

## Installation

```bash
npm install --save parmenides
```

## Usage

The main concept behind the library is "**_contracts_**". A **_contract_** is an _identity function_ that throws an error if the parameter doesn't have the expected type.

For example if you pass a `string` to the `str` **contract**, it will return the same value, for other _types_ it will throw an error:

```typescript
import { str } from 'parmenides';

str('Hello world'); // <- Returns 'Hello world'
str(8 as any); // <- Throws an error
```

### Check for specific values

```typescript
import { oneOf } from 'parmenides';
import { createInterface } from 'readline';

const isFruit = oneOf('apple', 'banana', 'strawberry', 'orange');
type Fruit = 'apple' | 'banana' | 'strawberry' | 'orange';

const readLine = createInterface({
  input: process.stdin,
  output: process.stdout
});

const aFruit: Fruit = 'cheese'; // <- static error. It will be warned by TypeScript itself.

readLine.question('Which is your favourite fruit?', (someFruit) => {
    const favouriteFruit: Fruit = isFruit(someFruit); // <- Will throw an error if `someFruit` has any other value than 'apple', 'banana', 'strawberry' or 'orange'. It's a potential dynamic error and TypeScript could not detect it.
});
```

It's important to notice that while `str` is a **contract** itself, `oneOf` is not. `oneOf` is a function that _returns_ a **contract**. You can think of it like a _contract builder_.

There are some other functions that help you build `contracts`. For instance, there is `arrOf`:

```typescript
import { arrOf, num, oneOf } from 'parmenides';

const onlyNumbers = arrOf(num);

onlyNumbers([1, 2, 3]); // <- Returns [1, 2, 3]
onlyNumbers(['Hello', 'world', 99] as any); // <- Throws an error

const onlyHobbits = arrOf(oneOf('Frodo', 'Bilbo', 'Merry', 'Pippin', 'Sam', 'Gollum'));

onlyHobbits(['Bilbo', 'Sam']); // <- Returns the array
onlyHobbits(['Frodo', 'Pippin', 'Gandalf']); // <- Throws an error
```

As you can see, `arrOf` takes a **contract** as parameter and returns another **contract**.

Last, but not least, the `objOf` function is perhaps the most usefull one:

```typescript
import { objOf, bool, str, num, arrOf } from 'parmenides';

const personValidator = objOf({
    name: str,
    age: num,
    profession: oneOf('student', 'employed', 'unemployed', 'retired'),
    address: objOf({
        street: str,
        city: str,
        state: str,
        country: str
    }),
    driving_license: bool
});

const peopleValidator = arrOf(personValidator);

// xhr function from any library you like
xhr('/URI/to/people')
    .then(peopleValidator)
    .then(people => /* The `people` variable is guaranteed to have the shape you have defined... */);
```

Notice that the `objOf` function takes an object that describes the _shape_ of the expected objects as a parameter. That object's properties are **contracts**.

### Type inference

It's important to mention that all the contracts are _typed_ and TypeScript will prevent errors if the parameters are incorrect and will infer the output:

```typescript
import { str, num, objOf } from 'parmenides';

str(9); // TypeScript will error ("string expected").
const aNumber = num(9); // TypeScript will infere it's a number.

const fooBarContract = objOf({
    foo: str,
    bar: num
});

fooBarContract({
    baz: 'Hello'
}); // <- Typescript will error

const fooBar = fooBarContract({
    foo: 'Hello',
    bar: 100
}); // <- TypeScript will infer type {foo: string; bar: number;}
```

furthermore, you can use the **type function** `ContractOf` to put the types of a contract inside a type. For example:

```typescript
import { ContractOf, num, objOf, str } from 'parmenides';

const personContract = objOf({
    name: str,
    age: num
});

type Person = ContractOf<typeof personContract>;

const john: Person = {
    name: "John Doe",
    age: 27
};
```

This is very useful as you can define the types for your external sources from contracts, and then use it with its name.

Because of the difference between `type` and `interface`, when you use the first, the type will be an alias for `{ name: string, age: number}`, and if you use an editor like VSCode, that's what you'll see when you hover over it. If you want to give it a name, you can use the following trick:

```typescript
import { ContractOf, num, objOf, str } from 'parmenides';

const personContract = objOf({
    name: str,
    age: num
});

interface Person extends ContractOf<typeof personContract> {}

const john: Person = {
    name: "John Doe",
    age: 27
};
```

## API

### Built-in `contracts`

| Function  | Type                                   | Example                          |
| --------- | -------------------------------------- | -------------------------------- |
| `bool`    | `IContract<boolean>`                   | `bool(true); `                   |
| `num`     | `IContract<number>`                    | `num(89); `                      |
| `str`     | `IContract<string>`                    | `str('Hello world'); `           |
| `undef`   | `IContract<undefined>`                 | `undef(undefined); `             |
| `nil`     | `IContract<null>`                      | `nil(null); `                    |
| `arr`     | `<T> IContract<T[]>`                   | `arr([1, 2, 3]); `               |
| `obj`     | `<T extends object> IContract<T>`      | `bool({foo: 'foo'}); `           |
| `regExp`  | `IContract<RegExp>`                    | `regExp(/^hello/i); `            |
| `date`    | `IContract<Date>`                      | `date(new Date()); `             |
| `anything`| `<T> IContract<T>`                     | `anything(4);`                   |
| `never`   | `IContract<never>`                     | `never(4 as never);`             |

#### A note on `anything`

`anything` is just an _identity function_ that will never throw an error. Its static type will be inferred from the value if possible or will default to `any`. It's useful with another functions like `objOf` (view below). For instance you can define a contract like:

```typescript
const objHasFooContract = objOf({
    foo: anything
});
```

#### A note on `never`

You may think the `never` contract is useless. But it can be used to do an exhaustive check:

```typescript
const reactToSemaphore = (semaphoreLight: 'red' | 'yellow' | 'green') => {
    switch (semaphoreLight) {
        case 'red':
            return 'stop';
        case 'yellow':
            return 'hurry';
        case 'green':
            return 'go';
        default:
            never(semaphoreLight);
    }
};
```

The function `reactToSemaphore` will fail in runtime if passed another value than `'red' | 'yellow' | 'green'`, but also with statically check that you aren't missing a `case` in the `switch` statement.

You can read more about the use of `never` [here](https://basarat.gitbooks.io/typescript/docs/types/never.html).

### `contract` _builders_

#### `optional`

`<T> (IContract<T>) -> IContract<T | undefined>`

Takes a `contract` and returns a new one that matches like the first one but also matches `undefined` values.

```typescript
const optionalNumber = optional(num);
// All the following are valid:
optionalNumber(9);
optionalNumber(undefined);
optionalNumber();
```

#### `nullable`

`<T> (IContract<T>) -> IContract<T | null>`

Takes a `contract` and returns a new one that matches like the first one but also matches `null` values.

```typescript
const nullableNumber = nullable(num);
// The following are valid
nullableNumber(9);
nullableNumber(null);
```

#### `oneOf`

`(...(string | number | boolean)[]) -> IContract<union of valid values>`

It is used to validate _`unum`-like values_. You specify the valid values and it returns a `contract` that will check against them. Example:

```typescript
const osContract = oneOf('Linux', 'Mac OS', 'Windows', 'Other');
const os = osContract('Linux'); // os's type is 'Linux' | 'Mac OS' | 'Windows' | 'Other'
```

TypeScript will infere the `contract`'s return value as the union of the literal types passed (up to 10 parameters, then behaves like `<T extends string | number | boolean> IContract<T>`).

#### `union`

`...(IContract) _> IContract<union of valid values>`

It takes _contracts_ as arguments and returns a new _contract_ that matches if any of the them matches.

```typescript
const numOrStr = union(num, str);
numOrStr(9);
numOrStr('nine');
```

TypeScript will infere the `contract`'s return value as the union of the return values of the _contracts_ passed (up to 10 parameters, then behaves like `IContract<any>`).

#### `arrOf`

`<T> (IContract<T>) -> IContract<T[]>`

It takes a `contract` "_`C`_" as a parameter and returns another `contract` that expects an `array` of _elements_ that match _`C`_.

```typescript
const arrOfNumbersContract = arrOf(num);
const numbers = arrOfNumbersContract([1, 2, 3]);
```

#### `objOf`

`<T> (IMapOfContracts<T>) -> IContract<T>`

Takes an _object_ that describes the _shape_ of the `objects` you want to validate and returns a `contract` with that validation. That _object_'s values must be `contracts`.

```typescript
const petContract = objOf(
    name: str,
    species: oneOf('dog', 'cat', 'golden fish', 'parrot', 'other'),
    age: number,
    gender: oneOf('male', 'female')
);
// <3
const oddy = petContract({
    name: 'Oddy',
    species: 'dog',
    age: 8,
    gender: 'female'
});
```

#### `strictObjOf`

`<T> (IMapOfContracts<T>) -> IContract<T>`

It is the same than `objOf` function, but also checks that the _target_ doesn't have extra _properties_.

```typescript
// It only matches empty objects
const emptyObjectContract = strictObjOf({});
const emptyObject = emptyObjectContract({});
```

#### `instanceOf`

`<C> (constructor: C) -> IContract<I>`
<small>(`I` is instance of `C`)</small>

It takes a _class_ or a or a _constructor function_ and returns a `contract` of instances of that _class_ or _constructor_.

```typescript
class Foo {}

const instanceOfFooContract = instanceOf(Foo);
const foo = instanceOfFooContract(new Foo());
```

#### `dictionaryOf`

`<T> (IContract<T>) -> IContract<Record<string, T>>`

It takes a `contract` "_`C`_" as a parameter and returns another `contract` that expects a `dictionary` of _elements_ that match _`C`_.


```typescript
const contactsContract = dictionaryOf(
    objOf({
        name: str,
        age: num
    })
);

const contacts = contactsContract({
    john: { name: 'john', age: 27},
    jane: { name: 'jane', age: 27}
});

```

## Publish

This library is published through TravisCI when merged to master, the version number is calculated automatically by semantic release.

Just create PR's to the development branch, and once that get's merged to master the release process will do it's magic.

## Credits

Made from the [`tsall/typescript-library-starter`](https://github.com/tsall/typescript-library-starter).

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/1573956?v=4" width="100px;"/><br /><sub><b>Gonzalo Gluzman</b></sub>](https://github.com/dggluz)<br />[💻](https://github.com/dggluz/parmenides/commits?author=dggluz "Code") [🎨](#design-dggluz "Design") [📖](https://github.com/dggluz/parmenides/commits?author=dggluz "Documentation") [💡](#example-dggluz "Examples") [🤔](#ideas-dggluz "Ideas, Planning, & Feedback") [📦](#platform-dggluz "Packaging/porting to new platform") [⚠️](https://github.com/dggluz/parmenides/commits?author=dggluz "Tests") | [<img src="https://avatars0.githubusercontent.com/u/2634059?v=4" width="100px;"/><br /><sub><b>Hernan Rajchert</b></sub>](https://github.com/hrajchert)<br />[🎨](#design-hrajchert "Design") [🤔](#ideas-hrajchert "Ideas, Planning, & Feedback") [💻](https://github.com/dggluz/parmenides/commits?author=hrajchert "Code") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
