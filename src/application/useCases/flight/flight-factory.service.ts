import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AirPlaneTicket } from '../../../domain/airplaneTicket/model';
import { Flight } from '../../../domain/flight/model';
import { FlightTime } from '../../../shared/ValueObjects/flightTime';
import { Price } from '../../../shared/ValueObjects/price';
import { Seat } from '../../../shared/ValueObjects/seat';
import { FlightDto, UpdateFlightDto } from '../../dto/flight.dto';
import { RowTicketDto } from '../../dto/rowTicket.dto';

@Injectable()
export class FlightFactoryService {
	createNewFlight(createFlightDto: FlightDto) {
		const number = createFlightDto.flightNumber;
		const time = new FlightTime(
			new Date(createFlightDto.departureTime),
			new Date(createFlightDto.arrivalTime),
		);

		const flightToInsert = new Flight(
			createFlightDto.originId,
			createFlightDto.destinyId,
			number,
			time,
			createFlightDto.id,
		);

		return flightToInsert;
	}

	generateTicketFlight(rowTicket: RowTicketDto, flight: uuid) {
		const tickets = [];
		const alphabet = String.fromCharCode(...Array(123).keys())
			.slice(97)
			.toUpperCase();
		let letter = 0;
		let code = 1;
		for (let index = 0; index < rowTicket.quant; index++) {
			const seat = new Seat(
				rowTicket.clase + '-' + alphabet[letter] + code,
			);
			const price = new Price(rowTicket.price);
			const ticket = new AirPlaneTicket(
				seat,
				price,
				flight,
				rowTicket.clase,
				'open',
			);
			if (index % 9 == 0) {
				letter++;
				code = 1;
			} else {
				code++;
			}
			tickets.push(ticket);
		}
		// console.log(tickets);
		return tickets;
	}

	updateFlight(updateFlightDto: UpdateFlightDto) {
		const newFlight = new Flight();

		return newFlight;
	}
}
