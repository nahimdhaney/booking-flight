import { ValueObject } from "../Core/valueObject";
import { Number } from "../Rules/number";




export class Price extends ValueObject{
    private readonly data: number;

    constructor(data: number){
        super();
        this.validate(new Number(data));
        this.data = data;
    }

}