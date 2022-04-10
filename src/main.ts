import { NestFactory } from '@nestjs/core';
import *  as moment from 'moment';
import { AppModule } from './app.module';
import { Flight } from './flights/model';
import { FlightNumber } from './shared/ValueObjects/flightNumber';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
console.log(moment())
let nuevoVuelo = new Flight("aksmsalk", "lksamsalk",new FlightNumber('skam'), 12, 12, moment().toDate(), moment().toDate());
console.log(nuevoVuelo);

bootstrap();
