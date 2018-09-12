import { ParmenidesError } from './parmenides.error';

export class ParmenidesArrOfError extends ParmenidesError {
	constructor (public originalError: ParmenidesError, public index: number) {
		super('');

		this.message = this.getMessage();
	}

	getMessage () {
		return `Invalid element arr${this.getNavigation()}: ${this.originalError.getGenericMessage()}`;
	}

	getNavigation () {
		return `[${this.index}]${this.originalError.getNavigation()}`;
	}

	getGenericMessage () {
		return this.originalError.getGenericMessage();
	}
}
