import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { error } from 'console';

@Controller('cars')
export class CarsController {
    constructor(
        private readonly carsService: CarsService
    ) {} 

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById( @Param('id', ParseIntPipe) id: number) {
        console.log({ id });
        throw new Error('Simulando Error por consola');
        return this.carsService.findOneById(id);
    }
}
