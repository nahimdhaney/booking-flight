
import { BusinessRule } from '../core/businessRule';

export class Date implements BusinessRule {
  data: string;
  message: string;

  constructor(data: string) {
    this.data = data;
  }

  validate(): boolean {
    return (this.data.length !== this.numberOfDigit)   
  }
}
