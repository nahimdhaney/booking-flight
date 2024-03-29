import { Controller, Get, Param, Post, Body, Put, Query } from '@nestjs/common';
import { FlightDto, UpdateFlightDto } from '../application/dto/flight.dto';
import { FlightServices } from '../application/useCases/flight';

@Controller('api/flight')
export class FlightController {
	constructor(private flightServices: FlightServices) {}

	@Get()
	async getAll() {
		return this.flightServices.getAllFlights();
	}

	@Get('/openTicket')
	async getTicketByFlightIdAndType(
		@Query('flight') flight,
		@Query('clase') clase,
		@Query('status') status,
	) {
		const ticket = await this.flightServices.getTicketByFlightIdAndType(
			flight,
			clase,
			status,
		);
		return ticket;
	}

	@Get('/seats')
	async getTickets(
		@Query('flight') flight,
		@Query('clase') clase,
		@Query('status') status,
	) {
		const ticket = await this.flightServices.getTickets(
			flight,
			clase,
			status,
		);
		return ticket;
	}

	@Get('/ticket')
	async getTicketId(@Query('id') id) {
		const ticket = await this.flightServices.getTicketById(id);
		return ticket;
	}

	@Get(':id')
	async getById(@Param('id') id: any) {
		return this.flightServices.getFlightById(id);
	}

	@Post()
	createFlight(@Body() flightDto: FlightDto) {
		// console.log(flightDto)
		return this.flightServices.createFlight(flightDto);
	}

	@Put(':id')
	updateFlight(
		@Param('id') flightId: string,
		@Body() updateFlightDto: UpdateFlightDto,
	) {
		return this.flightServices.updateFlight(flightId, updateFlightDto);
	}
}
