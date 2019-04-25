import { Contract } from './contract';
import { isValidationError } from './errors/parmenides.error';
import { ParmenidesUnionError } from './errors/parmenides-union.error';


export function union <A> (
	a: Contract<A>
): Contract<A>;
export function union <A, B> (
	a: Contract<A>,
	b: Contract<B>
): Contract<A | B>;
export function union <A, B, C> (
	a: Contract<A>,
	b: Contract<B>,
	c: Contract<C>
): Contract<A | B | C>;
export function union <A, B, C, D> (
	a: Contract<A>,
	b: Contract<B>,
	c: Contract<C>,
	d: Contract<D>
): Contract<A | B | C | D>;
export function union <A, B, C, D, E> (
	a: Contract<A>,
	b: Contract<B>,
	c: Contract<C>,
	d: Contract<D>,
	e: Contract<E>
): Contract<A | B | C | D | E>;
export function union <A, B, C, D, E, F> (
	a: Contract<A>,
	b: Contract<B>,
	c: Contract<C>,
	d: Contract<D>,
	e: Contract<E>,
	f: Contract<F>
): Contract<A | B | C | D | E | F>;
export function union <A, B, C, D, E, F, G> (
	a: Contract<A>,
	b: Contract<B>,
	c: Contract<C>,
	d: Contract<D>,
	e: Contract<E>,
	f: Contract<F>,
	g: Contract<G>
): Contract<A | B | C | D | E | F | G>;
export function union <A, B, C, D, E, F, G, H> (
	a: Contract<A>,
	b: Contract<B>,
	c: Contract<C>,
	d: Contract<D>,
	e: Contract<E>,
	f: Contract<F>,
	g: Contract<G>,
	h: Contract<H>
): Contract<A | B | C | D | E | F | G | H>;
export function union <A, B, C, D, E, F, G, H, I> (
	a: Contract<A>,
	b: Contract<B>,
	c: Contract<C>,
	d: Contract<D>,
	e: Contract<E>,
	f: Contract<F>,
	g: Contract<G>,
	h: Contract<H>,
	i: Contract<I>
): Contract<A | B | C | D | E | F | G | H | I>;
export function union <A, B, C, D, E, F, G, H, I, J> (
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
): Contract<A | B | C | D | E | F | G | H | I | J>;

/**
 * Takes contracts (up to 10) and retuns a Contract to values that comply with any of those Contracts.
 * For example: `union(str, num)` will return a Contract to `string | number`.
 * @param contracts each of the Contracts to which the values should match (it's a variadic function).
 * @returns Contract that will match values to any of the original Contracts.
 */
export function union (...contracts: Contract<any>[]): Contract<any> {
	return (value: any) => {
		const match = contracts.reduce((match, aContract) => {
			try {
				aContract(value);
				return true;
			}
			catch (err) {
				if (isValidationError(err)) {
					return match || false;
				}
				else {
					throw err;
				}
			}
		}, false);

		if (!match) {
			throw new ParmenidesUnionError(contracts, value);
		}
		return value;
	};
}
