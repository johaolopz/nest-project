import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
    private cars = [
        {
            id: 1,
            brand: 'Toyota',
            model: 'Corolla',
        },
        {
            id: 2,
            brand: 'Chevrolet',
            model: 'Beat',
        },
        {
            id: 3,
            brand: 'Mazda',
            model: 'BT50',
        },
        {
            id: 4,
            brand: 'Kia',
            model: 'Sportage',
        },
    ]

    findAll() {
        return this.cars
    }

    findOneById( id: number ) {
        const carFound = this.cars.find((elem)=> elem.id === id);
        
        if (!carFound) {
            throw new NotFoundException(`There is no car with id: ${ id }`);
        }

        return carFound;
    }

}
