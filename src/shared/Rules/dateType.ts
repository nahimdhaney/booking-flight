
import { BusinessRule } from '../Core/businessRule';

export class Datetype implements BusinessRule {
  data: Date;
  message: string;

  constructor(data: Date) {
    this.data = data;
    this.message = "Should be a Date";
  }

  validate(): boolean {
    return !(this.data instanceof Date)
  }
}
