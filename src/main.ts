import { NestFactory } from '@nestjs/core';
require('dotenv').config({path:'.env'});
import { AppModule } from './app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['error', 'warn'],
  });
  
  await app.listen(3000);
}

bootstrap()

// new Flight it creates
// let nuevoVuelo = new Flight("aksmsalk", "lksamsalk",new FlightNumber('skam'), 12, 12, new FlightTime(moment('2022-04-10T17:00:00-07:00').toDate(), moment().toDate()));

// let nahim = new Passanger("Nahim","Terrazas","9020353");
// let reservaTicket = new Booking(new ReservationNumber("12345678"),nuevoVuelo.tickets[0].id,nuevoVuelo.id,nahim.id,new ReservationStatus("open"))
// console.log(nuevoVuelo);
// console.log(reservaTicket);


// bootstrap();
