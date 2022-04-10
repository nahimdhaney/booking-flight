import { throwBusinessException } from './businessException';
import { BusinessRule } from './businessRule';

export class ValueObject {
  protected validate(rule: BusinessRule) {
    if (rule.validate()) throwBusinessException(rule.message);
  }
}
