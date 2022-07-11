import { PartialType } from '@nestjs/mapped-types';
import { v4 as uuid } from 'uuid';

export class PassangerDto {
	id: uuid;

	name: string;

	lastName: string;

	passport: string;
}

export class UpdatePassangerDto extends PartialType(PassangerDto) {}
