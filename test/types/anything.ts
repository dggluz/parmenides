import { anything } from 'parmenides'

// GIVEN a variable of a literal type:
const foo = 34 // $ExpectType 34

// `anything` returns that type as specific as it can
anything(foo) // $ExpectType 34
anything(foo * 2) // $ExpectType number
anything(foo as any) // $ExpectType any
