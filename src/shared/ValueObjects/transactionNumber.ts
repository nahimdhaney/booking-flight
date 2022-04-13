import { ValueObject } from "../Core/valueObject";
import { ExactDigits } from "../Rules/exactDigits";
import { Number } from "../Rules/number";




export class TransactionNumber extends ValueObject{
    private readonly data: number;

    constructor(data: number){
        super();
        this.validate(new Number(data));
        this.data = data;
    }

}