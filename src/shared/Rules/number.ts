
import { BusinessRule } from '../core/businessRule';

export class Number implements BusinessRule {
  data: number;
  numberOfDigit: number;
  message: string;

  constructor(data: number) {
    this.data = data;
    this.message = "should be a number"
  }
  
  validate(): boolean {
    return !(typeof this.data == 'number')
  }
}
