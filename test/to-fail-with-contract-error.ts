import { ValidationError, isValidationError } from "../src/parmenides";

expect.extend({
	toFailWithContractError (fn: unknown, expected: ValidationError) {
		let pass = false;
		try {
			if (typeof fn === 'function') {
				fn();
				return {
					pass,
					message: () => `The expected function needs to fail`
				}
			} else {
				return {
					pass,
					message: () => `The expected value needs to be a function: ${fn}`
				}
			}
		} catch (error) {
			pass = isValidationError(error) && error.eq(expected);
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
							return `Actual error explanation: "${errorExplanation}"\nExpected error explanation: "${expectedExplanation}"`;
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
