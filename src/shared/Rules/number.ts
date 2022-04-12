
import { BusinessRule } from '../core/businessRule';

export class Number implements BusinessRule {
  data: number;
  numberOfDigit: number;
  message: string;

  constructor(data: number) {
    this.data = data;
  }
  
  validate(): boolean {
    return isNaN(this.data)
  }
}
