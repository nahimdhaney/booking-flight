

import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { PaymentDto } from 'src/application/dto/payment.dto';
import { Payment } from 'src/domain/payment/model';
import { Amount } from 'src/shared/ValueObjects/amount';


@Injectable()
export class BookingCommands {
  constructor(
    private dataServices: IDataServices,
  ) {
    
  }

  @OnEvent('payment.created')
  async handlePaymentCreatedEvent(payload: Payment) {
    
    console.log(payload)
    // reduce accountReceivable
    const bookingToUpdate = await this.dataServices.booking.get(payload.booking);
  
    // console.log(bookingToUpdate)
    // console.log(bookingToUpdate.accountReceivable.currentValue)
    const bookingTicketPrice = bookingToUpdate.accountReceivable.currentValue.data;

    const amountPayed = payload.amount.data

    console.log("bookingTicketPrice ",bookingTicketPrice)

    const resultingAmount = (bookingTicketPrice - amountPayed)

    bookingToUpdate.accountReceivable.currentValue = new Amount(resultingAmount);

    let updatedBooking = await this.dataServices.booking.update(payload.booking, bookingToUpdate);
    console.log("UPDATED");
    console.log(updatedBooking);
  }


}
