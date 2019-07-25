import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Campsite } from 'src/app/models/campsite.model';
import { TestCase } from 'src/app/models/test-case.model';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.scss'],
  providers: [ReservationService]
})
export class MakeReservationComponent implements OnInit {

  constructor( private reservationService: ReservationService ) { }

  testCase: TestCase;
  availableCampsites: Array<Campsite>;
  gapSize: number;
  errMessage: string;

  ngOnInit() {

    //initialize variables
    this.availableCampsites = [];
    this.gapSize = 1;
    this.errMessage = null;

  }

  retrieveTestCase(testname: string) {

    //reset variables
    this.availableCampsites = [];
    this.errMessage = null;
    
    //retrieve desired test case
    this.reservationService.getTestCase(testname).subscribe(
      res => {

        this.testCase = new TestCase(res);

        //check that searched start date is before end date
        if(this.testCase.search.startDate > this.testCase.search.endDate) {
          this.errMessage = "The search Start Date must be earlier than the End Date.";
        }

        //perform reservation search logic
        else {
          this.availableCampsites = this.reservationService.findAvailableCampsites(this.testCase, this.gapSize);
          this.errMessage = this.availableCampsites.length == 0 ? "There are no campsites available for the searched dates." : this.errMessage;
        }

      },
      err => { console.log(err); }
    );

  }

}
