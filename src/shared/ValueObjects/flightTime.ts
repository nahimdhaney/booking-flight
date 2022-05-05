import { ValueObject } from "../Core/valueObject";
import { Datetype } from "../Rules/dateType";
import { Flight } from "../Rules/flight";




export class FlightTime extends ValueObject {
    private readonly departureTime: Date;
    private readonly arrivalTime: Date;

    constructor(departureTime: Date, arrivalTime: Date) {

        super();

        this.validate(new Datetype(departureTime));
        this.validate(new Flight(departureTime, arrivalTime));

        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
    }
}