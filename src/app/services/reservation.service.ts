import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestCase } from '../models/test-case.model';

@Injectable()
export class ReservationService {

  constructor(private http: HttpClient) { }

  //Retrieves JSON of test case
  getTestCase(filename: string) {
      return this.http.get('../../assets/' + filename + '.json');
  }

  //determines available campsites from test case file 
  findAvailableCampsites(testCase: TestCase, gapSize: number){

    //initialize all campsites as available
    let availableCampsites = testCase.campsites;

    let search = testCase.search;

    testCase.reservations.forEach(res => {

      //check that we haven't already removed the campsite from the available list
      if(availableCampsites.filter(d => d.id == res.campsiteId).length == 0) {
        return;
      }
      
      let available = true;

      //check that gap between reservations meets the allowed gap size
      available = this.checkGaps(search.startDate, res.endDate, gapSize) && this.checkGaps(res.startDate, search.endDate, gapSize);
      
      //check that searched reservation doesn't conflict with current reservation
      if(available) {
        available = ( search.endDate < res.startDate ) || ( search.startDate > res.endDate ) ? available : false;
      }

      //if campsite unavailable, remove from list of available campsites
      if(!available) {
        availableCampsites = availableCampsites.filter(d => d.id != res.campsiteId);
      }

    })
    
    return availableCampsites;

  }


  //check if dates have gap between them
  checkGaps(laterDate: Date, earlierDate: Date, gapSize: number){

    //calculate gap size in milliseconds
    let laterTime = laterDate.getTime();
    let earlierTime = earlierDate.getTime();
    let difference = laterTime - earlierTime;

    //milliseconds in a day
    let dayMs = 1000 * 60 * 60 * 24;
    
    if(difference <= dayMs + (dayMs * gapSize) && difference > dayMs){
        return false;
    }
    else{
        return true;
    }

  }

}
