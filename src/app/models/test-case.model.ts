import { Campsite } from './campsite.model';
import { Reservation } from './reservation.model';

export class TestCase {

    constructor(input) {

        this.search = {
            startDate: new Date( input.search.startDate + " 00:00" ),
            endDate: new Date( input.search.endDate + " 00:00" ),
        }

        this.campsites = input.campsites;
        this.reservations = input.reservations;
        this.reservations.forEach( (res, i) => {
            res.startDate = new Date( input.reservations[i].startDate + " 00:00" );
            res.endDate = new Date( input.reservations[i].endDate + " 00:00" )
        })

    }

    search: {
        startDate: Date,
        endDate: Date
    };
    campsites: Array<Campsite>;
    reservations: Array<Reservation>;
    
}