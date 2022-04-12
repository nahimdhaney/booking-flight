import { NestFactory } from '@nestjs/core';
import *  as moment from 'moment';
import { AppModule } from './app.module';
import { Flight } from './flights/model';
import { FlightNumber } from './shared/ValueObjects/flightNumber';
import { FlightTime } from './shared/ValueObjects/flightTime';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
console.log(moment('2022-04-10T17:00:00-07:00').toDate())
console.log(moment().toDate())
let nuevoVuelo = new Flight("aksmsalk", "lksamsalk",new FlightNumber('skam'), 12, 12, new FlightTime(moment('2022-04-10T17:00:00-07:00').toDate(), moment().toDate()));
console.log(nuevoVuelo);

bootstrap();
