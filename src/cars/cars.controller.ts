import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    ParseUUIDPipe,
    Patch,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dtos';

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
    // getCarById( @Param('id', ParseIntPipe) id: number ) {
    getCarById( @Param('id', new ParseUUIDPipe({ version: '4' })) id: string ) {
        console.log({ id });
        return this.carsService.findOneById(id);
    }

    @Post()
    // @UsePipes( ValidationPipe )
    createCar( @Body() createCarDto: CreateCarDto ) {
        return this.carsService.createCar(createCarDto);
    }

    @Patch(':id')
    updateCar( @Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateCarDto: UpdateCarDto ) {
        return this.carsService.updateCar(id, updateCarDto);
    }

    @Delete(':id')
    // deleteCar( @Param('id', ParseIntPipe) id: number ) {
    deleteCar( @Param('id', ParseUUIDPipe) id: string ) {
        return this.carsService.deleteCar(id);
    }
}
