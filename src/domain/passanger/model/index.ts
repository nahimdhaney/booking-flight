import { v4 as uuid } from 'uuid';
import { AggregateRoot } from '../../../shared/Core/aggregateRoot';

export class Passanger extends AggregateRoot<uuid> {
	id: uuid;
	name: string;
	lastName: string;
	passport: string;
	needsAssistance: boolean;

	constructor(
		name?: string,
		lastName?: string,
		passport?: string,
		needsAssistance?: boolean,
	) {
		super();
		this.id = uuid();
		this.name = name;
		this.lastName = lastName;
		this.passport = passport;
		this.needsAssistance = needsAssistance;
	}
}
