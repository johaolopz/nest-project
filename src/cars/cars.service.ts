import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/cars.interfaces';
import { getUUID } from 'src/adapters';
import { CreateCarDto, UpdateCarDto } from './dtos';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        {
            id: getUUID(),
            brand: 'Toyota',
            model: 'Corolla',
        },
        {
            id: getUUID(),
            brand: 'Chevrolet',
            model: 'Beat',
        },
        {
            id: getUUID(),
            brand: 'Mazda',
            model: 'BT50',
        },
        {
            id: getUUID(),
            brand: 'Kia',
            model: 'Sportage',
        },
    ]

    findAll() {
        return this.cars
    }

    findOneById( id: string ) {
        const carFound = this.cars.find((elem)=> elem.id === id);
        
        if (!carFound) {
            throw new NotFoundException(`There is no car with id: ${ id }`);
        }

        return carFound;
    }

    createCar( createCarDto: CreateCarDto ) {
        const car = {
            id: getUUID(),
            ...createCarDto,
        }

        this.cars.push(car);

        return car;
    }

    updateCar( id: string, updateCarDto: UpdateCarDto ) {
        let carFounded = this.findOneById(id);

        if ( updateCarDto.id  && updateCarDto.id !== id ) {
            // Los errores se pueden manejar con las excepciones de NestJs
            throw new BadRequestException('Id is different from that of the body');
        }

        this.cars = this.cars.map(( car ) => {
            if ( car.id === id ) {
                carFounded = { ...car, ...updateCarDto, id };
                return carFounded;
            }

            return car;
        });

        return carFounded;
    }

    deleteCar( id: string ) {
        let carFounded = this.findOneById(id);

        this.cars = this.cars.filter((car) => car.id !== id);
    }

}
