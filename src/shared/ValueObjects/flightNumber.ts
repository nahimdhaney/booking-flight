import { ValueObject } from "../Core/valueObject";
import { ExactDigits } from "../Rules/exactDigits";




export class FlightNumber extends ValueObject{
    private readonly data: string;

    constructor(data: string){
        super();
        this.validate(new ExactDigits(data,4));
        this.data = data;
    }

}