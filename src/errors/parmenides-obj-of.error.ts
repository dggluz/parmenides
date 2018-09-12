import { ParmenidesError } from './parmenides.error';

const canHaveDotNotation = (property: string) =>
	/^[a-z_]+[a-z0-9_]*$/i.test(property)
;

const getAccessor = (property: string) =>
	canHaveDotNotation(property) ?
		`.${property}` :
		`['${property.replace(/'/g, "\\'")}']`
;

export class ParmenidesObjOfError extends ParmenidesError {
	constructor (public originalError: ParmenidesError, public key: string) {
		super('');

		this.message = this.getMessage();
	}

	getMessage () {
		return `Invalid property obj${this.getNavigation()}: ${this.originalError.getGenericMessage()}`;
	}

	getNavigation () {
		return `${getAccessor(this.key)}${this.originalError.getNavigation()}`;
	}

	getGenericMessage () {
		return this.originalError.getGenericMessage();
	}
}
