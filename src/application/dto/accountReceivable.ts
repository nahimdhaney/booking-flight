import { PartialType } from '@nestjs/mapped-types';
import { v4 as uuid } from 'uuid';

export class AccountReceivableDto {

  id: uuid;
  
  amount:number;
  
}

export class UpdateAccountReceivableDto extends PartialType(AccountReceivableDto) {}
