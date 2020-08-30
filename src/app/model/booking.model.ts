import { User } from './user.model';
import { Address } from './address.model';
import { Rating } from './rating.model';

export class Booking {
    bookingId: number;
    bookingFrom: Date;
    bookingTo: Date;
    status: string;
    daysWorked: number;
    user: User;
    employee: User;
    rating: Rating;
    address: Address;
    service: string;
    subService: string;
    description: string;

    constructor() {}

}

