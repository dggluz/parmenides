/**
 * A generic error. All other errors will inherit from this one, hence it's easy to check if an error is a
 * ParmenidesError (its instanceof ParmenidesError or has the public property ParmenidesError = 'ParmenidesError').
 * It also has some generic error methods.
 */
// export interface ParmenidesError

// export type ParmenidesError = BlaError | BleError
export interface ValidationError {
	kind: 'ValidationError'
	type: string;

	explain(): string;
	eq(error: ValidationError): boolean;
	// TODO: add message property?
}

export const isTypeError = <ErrorType>(type: string) =>
	(error: any): error is ErrorType =>
		error.hasOwnProperty('type') && error.type === type
;


export function isValidationError(error: any): error is ValidationError {
	return typeof error === 'object' && error.hasOwnProperty('kind') && error.kind === 'ValidationError';
}
