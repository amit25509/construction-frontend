import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Booking } from '../model/booking.model';
import { BaseUrl } from '../model/baseUrl.model';

@Injectable({
  providedIn: 'root'
})

export class BookingService {

  constructor(private http: HttpClient) {
   }

   public getBooking(): Observable<Booking[]> {
     return this.http.get(BaseUrl.baseUrl+'booking/getbyusername')
     .pipe(map((bookingData: Booking[]) => {
         return bookingData;
       }),
     catchError(
       (error: Response) => throwError(error)
     )
     );
   }
   
}
