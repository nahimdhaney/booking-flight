import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-service/data-services.module';
import { ProducerModule } from '../producer/producer.module';
import { PassangerFactoryService } from './passanger-factory.service';
import { PassangerServices } from './passanger-services.service';

@Module({
	imports: [DataServicesModule, ProducerModule],
	providers: [PassangerFactoryService, PassangerServices],
	exports: [PassangerFactoryService, PassangerServices],
})
export class PassangerServicesModule {}
