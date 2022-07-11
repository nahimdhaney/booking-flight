import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/application/services/data-service/data-services.module';
import { PassangerFactoryService } from './passanger-factory.service';
import { PassangerServices } from './passanger-services.service';

@Module({
	imports: [DataServicesModule],
	providers: [PassangerFactoryService, PassangerServices],
	exports: [PassangerFactoryService, PassangerServices],
})
export class PassangerServicesModule {}
