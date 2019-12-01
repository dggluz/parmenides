import { ValidationError, isValidationError } from "../src/parmenides";
import {red, green} from 'chalk';

const fail = (message: () => string) => (
	{
		pass: false,
		message
	}
)


expect.extend({
	toFailWithContractError (fn: unknown, expected: ValidationError) {
		let pass = false;
		try {


			if (typeof fn !== 'function') {
				// return {pass: true, message: () => ''};
				return fail(
					() => `WRONG USAGE: I was ${green('expecting a function to call')}, but I ${red('received the value')}: ${fn}`
				)
			}
			const value = fn();
			return fail(
				() => `The function was ${green('expected to fail')}, but ${red('succeded with value')}: ${value}`
			)
		} catch (error) {
			pass = isValidationError(error) && error.eq(expected);

			// if (pass) {
			// 	console.log(`${green('Expected message')}: ${expected}`)
			// }
			let message = pass
				? () => 'toFailWithContractError negated message not implemented'
				: () => {
					// return 'pass is s' + (isValidationError(error) && error.eq(expected));
					if (typeof fn !== 'function') return 'You need to provide a function';
					if (typeof error === 'undefined') return 'The provided function did not fail';

					if (!isValidationError(error)) {
						return `The received value \`${error}\` of type \`${typeof error}\` is not a ValidationError`;
					} else {
						const errorExplanation = error.explain();
						const expectedExplanation = expected.explain();

						if (errorExplanation !== expectedExplanation) {
							return [
								`${red('Actual error explanation')}: "${errorExplanation}"`,
								`${green('Expected error explanation')}: "${expectedExplanation}"`
							].join('\n');
						} else {
							return `The errors are different but are explained the same: "${errorExplanation}"`;
						}
					}
				}

			return {
				message,
				pass
			}
		}
	},
});

declare global {
	namespace jest {
	  interface Matchers<R> {
		toFailWithContractError(failure: ValidationError): R;
	  }
	}
}
