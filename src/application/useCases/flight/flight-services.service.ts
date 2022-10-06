import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AirPlaneTicket } from '../../../domain/airplaneTicket/model';
import { Flight } from '../../../domain/flight/model';
import { IDataServices } from '../../abstracts/data-services.abstract';
import { FlightDto, UpdateFlightDto } from '../../dto/flight.dto';

// import { IDataServices } from 'application/abstracts/data-services.abstract';
// import { FlightDto, UpdateFlightDto } from 'application/dto/flight.dto';
// import { AirPlaneTicket } from 'domain/airplaneTicket/model';
// import { Flight } from 'domain/flight/model';
// import { MessageProducer } from '../producer/producer.service';
import { FlightFactoryService } from './flight-factory.service';

@Injectable()
export class FlightServices {
	constructor(
		private dataServices: IDataServices,
		private flightFactoryService: FlightFactoryService,
		private eventEmitter: EventEmitter2, // private producer: MessageProducer,
	) {}

	getAllFlights(): Promise<Flight[]> {
		return this.dataServices.flight.getAll();
	}

	getFlightById(id: any): Promise<Flight> {
		return this.dataServices.flight.get(id);
	}

	getTicketById(id: any): Promise<AirPlaneTicket> {
		return this.dataServices.airPlaneTicket.get(id);
	}

	async getTicketByFlightIdAndType(
		flight_id: string,
		clase: string,
		status: string,
	): Promise<AirPlaneTicket> {
		const airplaneticket = await this.dataServices.airPlaneTicket.query({
			flight: flight_id,
			clase: clase,
			status: status,
		});
		return airplaneticket[0];
	}

	async getTickets(
		flight: string,
		clase?: string,
		status?: string,
	): Promise<any> {
		const querySeats = { flight: flight };

		if (clase) querySeats['clase'] = clase;
		if (status) querySeats['status'] = status;

		const airplaneTickets = await this.dataServices.airPlaneTicket.query(
			querySeats,
		);

		const flightReturned = await this.dataServices.flight.get(flight);
		const info = {
			flight: flightReturned,
			airplaneTickets,
		};
		return info;
	}

	async createFlight(createFlightDto: FlightDto): Promise<Flight> {
		const existInDatabase = await this.dataServices.flight.get(
			createFlightDto.id,
		);
		if (existInDatabase) {
			return existInDatabase;
		}
		const flight =
			this.flightFactoryService.createNewFlight(createFlightDto);

		const createdFlight = await this.dataServices.flight.create(flight);

		for (let index = 0; index < createFlightDto.tickets.length; index++) {
			const ticketsToCreate = createFlightDto.tickets[index];
			const tickets = this.flightFactoryService.generateTicketFlight(
				ticketsToCreate,
				createdFlight.id,
			);

			for (let y = 0; y < tickets.length; y++) {
				const element = tickets[y];
				await this.dataServices.airPlaneTicket.create(element);
			}
		}

		this.eventEmitter.emit('flight.created', createdFlight);

		// this.producer.sendMessage({
		// 	id: flight.id,
		// 	body: { flight: createdFlight, event: 'VueloCreado' },
		// });

		return createdFlight;
	}

	updateFlight(
		flightId: string,
		updateFlightDto: UpdateFlightDto,
	): Promise<Flight> {
		const flight = this.flightFactoryService.updateFlight(updateFlightDto);
		return this.dataServices.flight.update(flightId, flight);
	}
}
