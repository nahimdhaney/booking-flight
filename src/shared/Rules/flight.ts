
import { BusinessRule } from '../core/businessRule';

export class Flight implements BusinessRule {
    departure: Date;
    arrival: Date;
    message: string;

  constructor(departure: Date,arrival: Date) {
    this.departure = departure;
    this.arrival = arrival;
    this.message = "Departure hour should be before arrival hour";
  }

  validate(): boolean {
    return this.departure >= this.arrival;
  }
}
