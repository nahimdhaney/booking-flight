import { Injectable } from '@nestjs/common';
import { PaymentDto, UpdatePaymentDto } from 'src/application/dto/payment.dto';
import { Payment } from 'src/domain/payment/model';
import { Amount } from 'src/shared/ValueObjects/amount';
import { TransactionNumber } from 'src/shared/ValueObjects/transactionNumber';
import { v4 as uuid } from 'uuid';


@Injectable()
export class PaymentFactoryService {

  createNewPayment(createpaymentDto: PaymentDto) {
    
    const transactionNumber = new TransactionNumber(createpaymentDto.transactionNumber);
    const amount = new Amount(createpaymentDto.amount);

    const passangerToInsert = new Payment(
      transactionNumber,
      createpaymentDto.booking,
      amount
      );


    return passangerToInsert;
  }



  updatePayment(updatepaymentDto: UpdatePaymentDto) {

    const newPayment = new Payment();

    return newPayment;
  }
}
