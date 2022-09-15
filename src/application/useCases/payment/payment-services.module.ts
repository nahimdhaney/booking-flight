import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-service/data-services.module';
import { ProducerModule } from '../producer/producer.module';
import { PaymentFactoryService } from './payment-factory.service';
import { PaymentServices } from './payment-services.service';

@Module({
	imports: [DataServicesModule, ProducerModule],
	providers: [PaymentFactoryService, PaymentServices],
	exports: [PaymentFactoryService, PaymentServices],
})
export class PaymentServicesModule {}
