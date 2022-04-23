import { NestFactory } from '@nestjs/core';
import *  as moment from 'moment';
import { AppModule } from './app.module';
import { Booking } from './domain/booking/model';
import { Flight } from './domain/flights/model';
import { Passanger } from './domain/passanger/model';
import { FlightNumber } from './shared/ValueObjects/flightNumber';
import { FlightTime } from './shared/ValueObjects/flightTime';
import { ReservationNumber } from './shared/ValueObjects/reservationNumber';
import { ReservationStatus } from './shared/ValueObjects/ReservationStatus';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}



// new Flight it creates
let nuevoVuelo = new Flight("aksmsalk", "lksamsalk",new FlightNumber('skam'), 12, 12, new FlightTime(moment('2022-04-10T17:00:00-07:00').toDate(), moment().toDate()));

let nahim = new Passanger("Nahim","Terrazas","9020353");
let reservaTicket = new Booking(new ReservationNumber("12345678"),nuevoVuelo.tickets[0].id,nuevoVuelo.id,nahim.id,new ReservationStatus("open"))
console.log(nuevoVuelo);
console.log(reservaTicket);


// bootstrap();
