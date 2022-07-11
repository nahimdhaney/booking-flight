import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/application/services/data-service/data-services.module';
import { PaymentFactoryService } from './payment-factory.service';
import { PaymentServices } from './payment-services.service';

@Module({
	imports: [DataServicesModule],
	providers: [PaymentFactoryService, PaymentServices],
	exports: [PaymentFactoryService, PaymentServices],
})
export class PaymentServicesModule {}
