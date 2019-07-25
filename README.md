# ReservationApp

The Reservation App performs the logic of searching for the availability of a desired reservation, given a list of campsites and their existing reservations. A list of available campsites is displayed after the search is performed.

## Building and Running

1. In your terminal, navigate to the directory of the Reservation App (the folder containing this README file). 

2. Run `npm install` to install dependencies.

3. Run `ng serve` to load the application into the browser.

4. Navigate to `http://localhost:4200/` in your browser to use the application.

## Test Case Descriptions

1. Provided Test Case
    
    •Test case provided by Campspot.

    Expected Output: "Comfy Cabin", "Rickety Cabin", "Cabin in the Woods"

2. My Test 1
    
    •Search end date is earlier than search start date.

    Expected Output: "The search Start Date must be earlier than the End Date."

3. My Test 2
    
    •Searched reservation dates conflict with all existing reservation dates.

    Expected Output: "There are no campsites available for the searched dates."

4. My Test 3
    
    •Campsite 1 contains a single day gap on both sides of the searched reservation.
    
    •Campsite 2 contains a two day gap on both sides of the searched reservation.

    Expected Output: "Comfy Cabin"

5. My Test 4

    •Searched reservation exists in a separate month from existing reservations and has no conflicts.

    Expected Output: "Comfy Cabin", "Cozy Cabin", "Rustic Cabin", "Rickety Cabin", "Cabin in the Woods"

6. My Test 5
    
    •Campsite 1 contains a single day gap before the searched start date.
    
    •Campsite 2 contains a single day gap after the searched end date. 
    
    •Campsite 3 has a reservation that overlaps with the searched reservation.
    
    •Campsite 4 has no conflicts with the searched reservation.

    Expected Output: "Rickety Cabin"

7. My Test 6
    
    •Campsite 1 has a single day gap but the reservation exists in the previous month.

    Expected Output: "There are no campsites available for the searched dates."

## Reservation Search Logic

1. Create a list of available campsites which contains all campsites defined in the test JSON.

2. Iterate through the list of existing reservations.

3. If the campsite associated with the current existing reservation has already been removed from the list of available campsites, skip the reservation logic and move to the next reservation (to avoid performing logic on a campsite that we already know is unavailable).

4. Check that there is not a gap (equal to the designated gap size) between the searched reservation and the current existing reservation (in this case a single day).

5. Check that the searched reservation either:

    •Ends before the current existing reservation starts

    •Starts after the current existing reservation ends.

6. If both checks pass (i.e. there are no conflicts in reservation dates), move on to the next existing reservation.

7. If either check fails (i.e. there is a conflict in reservation dates), remove the campsite associated with the current existing reservation from the list available campsites and move on to the next existing reservation.

8. After iterating through all existing reservations, return the list of available campsites.

## Assumptions

1. Guests will check in/out of their reservation at midnight.

2. Given a gap rule of X number of days, we won't allow reservations with a gap size between 24 hours and X days plus 24 hours (i.e. reservation gaps less than 24 hours are allowed).

3. Dates for existing reservations are accurate and have been checked for inconsistencies before being read by the application. Existing reservations do not overlap within campsites and start dates will always come before end dates.

4. We don't need to worry about formatting information to be persisted to a database. We are only concerned with performing the reservation logic and displaying the results.