import { ValueObject } from "../Core/valueObject";
import { ExactDigits } from "../Rules/exactDigits";




export class Seat extends ValueObject{
    private readonly data: string;

    constructor(data: string){
        super();
        this.validate(new ExactDigits(data,2));
        this.data = data;
    }

}