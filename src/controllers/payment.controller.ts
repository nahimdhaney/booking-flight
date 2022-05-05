import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { PaymentDto, UpdatePaymentDto } from 'src/application/dto/payment.dto';
import { PaymentServices } from 'src/application/useCases/payment';
import { Payment } from 'src/domain/payment/model';


@Controller('api/payment')
export class PaymentController {
  constructor(private paymentServices: PaymentServices) { }

  @Get()
  async getAll() {
    return this.paymentServices.getAllPayments();
  }

  @Get(':id')
  async getById(@Param('id') id: any) {
    return this.paymentServices.getPaymentById(id);
  }

  @Post()
  createPayment(@Body() paymentDto: PaymentDto) {
    return this.paymentServices.createPayment(paymentDto);
  }

  @Put(':id')
  updatePayment(
    @Param('id') paymentId: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentServices.updatePayment(paymentId, updatePaymentDto);
  }
}
