export abstract class ParmenidesError extends TypeError {
	ParmenidesError = 'ParmenidesError';

	constructor (message: string) {
		super(message);
	}

	getMessage () {
		return this.message;
	}

	getGenericMessage () {
		return this.getMessage();
	}

	getNavigation () {
		return '';
	}
}
