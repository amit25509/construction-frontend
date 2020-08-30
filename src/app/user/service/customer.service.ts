import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Booking } from 'src/app/model/booking.model';
import { BaseUrl } from 'src/app/model/baseUrl.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

 
  constructor(private http: HttpClient) {
  }

  public getBooking(): Observable<Booking[]> {
    return this.http.get(BaseUrl.baseUrl+'booking/getbyusername')
    .pipe(map((bookingData: Booking[]) => {
      console.log(bookingData);
        return bookingData;
      }),
    catchError(
      (error: Response) => throwError(error)
    )
    );
  }
  
}
