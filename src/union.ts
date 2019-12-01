import { Contract } from './contract'
import { isValidationError, ValidationError } from './errors/parmenides.error'
import { ParmenidesUnionError } from './errors/parmenides-union.error'

export function union<A>(a: Contract<A>): Contract<A>
export function union<A, B>(a: Contract<A>, b: Contract<B>): Contract<A | B>
export function union<A, B, C>(a: Contract<A>, b: Contract<B>, c: Contract<C>): Contract<A | B | C>
export function union<A, B, C, D>(
	a: Contract<A>,
	b: Contract<B>,
	c: Contract<C>,
	d: Contract<D>
): Contract<A | B | C | D>
export function union<A, B, C, D, E>(
	a: Contract<A>,
	b: Contract<B>,
	c: Contract<C>,
	d: Contract<D>,
	e: Contract<E>
): Contract<A | B | C | D | E>
export function union<A, B, C, D, E, F>(
	a: Contract<A>,
	b: Contract<B>,
	c: Contract<C>,
	d: Contract<D>,
	e: Contract<E>,
	f: Contract<F>
): Contract<A | B | C | D | E | F>
export function union<A, B, C, D, E, F, G>(
	a: Contract<A>,
	b: Contract<B>,
	c: Contract<C>,
	d: Contract<D>,
	e: Contract<E>,
	f: Contract<F>,
	g: Contract<G>
): Contract<A | B | C | D | E | F | G>
export function union<A, B, C, D, E, F, G, H>(
	a: Contract<A>,
	b: Contract<B>,
	c: Contract<C>,
	d: Contract<D>,
	e: Contract<E>,
	f: Contract<F>,
	g: Contract<G>,
	h: Contract<H>
): Contract<A | B | C | D | E | F | G | H>
export function union<A, B, C, D, E, F, G, H, I>(
	a: Contract<A>,
	b: Contract<B>,
	c: Contract<C>,
	d: Contract<D>,
	e: Contract<E>,
	f: Contract<F>,
	g: Contract<G>,
	h: Contract<H>,
	i: Contract<I>
): Contract<A | B | C | D | E | F | G | H | I>
export function union<A, B, C, D, E, F, G, H, I, J>(
	a: Contract<A>,
	b: Contract<B>,
	c: Contract<C>,
	d: Contract<D>,
	e: Contract<E>,
	f: Contract<F>,
	g: Contract<G>,
	h: Contract<H>,
	i: Contract<I>,
	j: Contract<J>
): Contract<A | B | C | D | E | F | G | H | I | J>

/**
 * Takes contracts (up to 10) and retuns a Contract to values that comply with any of those Contracts.
 * For example: `union(str, num)` will return a Contract to `string | number`.
 * @param contracts each of the Contracts to which the values should match (it's a variadic function).
 * @returns Contract that will match values to any of the original Contracts.
 */
export function union(...contracts: Contract<any>[]): Contract<any> {
	return (value: any) => {
		const errors = [] as ValidationError[]

		for (let i = 0; i < contracts.length; i++) {
			try {
				// If one of the contracts succedes, we return that one
				return contracts[i](value)
			} catch (err) {
				// If the error is not a validation error, then we fail quickly
				if (!isValidationError(err)) {
					throw err
				}

				// If it is a validation we accumulate it
				errors.push(err)
			}
		}
		// If we got to this point is because all contracts have fail, so we collect all errors
		throw new ParmenidesUnionError(contracts, errors, value)
	}
}
