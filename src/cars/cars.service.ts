import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/cars.interfaces';
import { getUUID } from 'src/adapters';

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

}
