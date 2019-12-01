import { optional, str, TypeMismatch } from '../src/parmenides';
import './to-fail-with-contract-error';

describe('`optional` contract builder', () => {
	it('`optional(str)(undefined)` returns undefined', () => {
		expect(optional(str)(undefined)).toBe(undefined);
	});
	it('`optional(str)("Hello world")` returns the string', () => {
		expect(optional(str)('Hello world')).toBe('Hello world');
	});

	it('`optional(str)(9)` fails', () => {
		expect(() => optional(str)(9 as any)).toFailWithContractError(
			new TypeMismatch('string', 9)
		);
	});

	it('`optional(str)(false)` fails', () => {
		expect(() => optional(str)(false as any)).toFailWithContractError(
			new TypeMismatch('string', false)
		);
	});
});
