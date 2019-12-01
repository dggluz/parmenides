export interface ValidationError {
	kind: 'ValidationError';
	name: string;

	/**
	 * Explains the error as if it was called from a TOP level perspective
	 */
	explain(): string;

	/**
	 * Explain the root cause of the error
	 */
	explainCause(): string;

	/**
	 * Check if two ValidationError's are the same
	 * @param error
	 */
	eq(error: ValidationError): boolean;
	// TODO: add message property?
}

export interface AccesableError {
	/**
	 * Returns a string representation of the path to where the original
	 * error was originated from. For example "[0].id"
	 * @param isTopLevelError Indicates if this is the top level error
	 */
	getAccesor(isTopLevelError: boolean): string;
}

export const isAccesableError = (error: any): error is AccesableError =>
	typeof error === 'object' &&
	'getAccesor' in error
;

export const getAccesor = (error: any, isTopLevelError: boolean) =>
	isAccesableError(error)
		? error.getAccesor(isTopLevelError)
		: ''
;

export const isTypeError = <ErrorType>(type: string) =>
	(error: any): error is ErrorType =>
		typeof error === 'object' &&
		'name' in error &&
		// error.hasOwnProperty('type') &&
		error.name === type
;


export const isValidationError = (error: any): error is ValidationError =>
	typeof error === 'object' &&
	error.hasOwnProperty('kind') &&
	error.kind === 'ValidationError'
;
