import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { CreateFlightDto, UpdateFlightDto } from 'src/application/dto/flight.dto';
import { FlightServices } from 'src/application/useCases/flight';
// import { CreateFlightDto, UpdateFlightDto } from '../core/dtos';
// import { FlightServices } from '../services/use-cases/author/author-services.service';

@Controller('api/author')
export class FlightController {
  constructor(private authorServices: FlightServices) {}

  @Get()
  async getAll() {
    return this.authorServices.getAllFlights();
  }

  @Get(':id')
  async getById(@Param('id') id: any) {
    return this.authorServices.getFlightById(id);
  }

  @Post()
  createFlight(@Body() authorDto: CreateFlightDto) {
    return this.authorServices.createFlight(authorDto);
  }

  @Put(':id')
  updateFlight(
    @Param('id') authorId: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ) {
    return this.authorServices.updateFlight(authorId, updateFlightDto);
  }
}
