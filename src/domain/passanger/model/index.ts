import { v4 as uuid } from 'uuid';
import { AggregateRoot } from 'src/shared/core/aggregateRoot';

export class Passanger extends AggregateRoot<uuid> {
  id:uuid;
  name: string;
  lastName: string;
  passport : string;

  constructor(
    name?: string,
    lastName?: string,
    passport? : string,
    ) {
    super();
    this.id = uuid();
    this.name= name;
    this.lastName=lastName;
    this.passport=passport;
  }
}
