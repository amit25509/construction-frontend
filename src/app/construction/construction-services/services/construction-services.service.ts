import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { BaseUrl } from 'src/app/model/baseUrl.model';
import { Booking } from 'src/app/model/booking.model';
import { map, catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ConstructionServicesService {

  msg1:'';

  constructor(private http: HttpClient) { }


  addBooking(booking): Observable<Booking[]> {
    return this.http.post(BaseUrl.baseUrl + 'booking/add', booking)
    .pipe(map((bookingData: Booking[]) => {
      return bookingData;
    }),
  catchError(
    (error: Response) => throwError(error)
  )
  );
  }

  
  public getUserByOccupation(occupationId){
    return this.http.get(`${BaseUrl.baseUrl+'user/getallbyoccupation'}/${occupationId}`);
  }

  sendMessage(msg) {
    this.msg1=msg;
    console.log('service_'+this.msg1);
}

getMessage(): string {
  return this.msg1;
}
  
}
