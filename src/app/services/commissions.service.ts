import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Commissions } from '../model/commissions.model';
import { BaseUrl } from '../model/baseUrl.model';

@Injectable({
  providedIn: 'root'
})
export class CommissionsService {

  ngetAllCommissions: string;
  constructor(private http: HttpClient) {
   }
   public getAllCommissions(): Observable<Commissions[]> {
    return this.http.get(BaseUrl.baseUrl+'commission/getbyusername')
    .pipe(map((commissionsData: Commissions[]) => {
        return commissionsData;
      }),
    catchError(
      (error: Response) => throwError(error)
    )
    );
  }
  public getBookingById(bookingId){
    return this.http.get(`${BaseUrl.baseUrl+'booking/getbyid'}/${bookingId}`);
  }
}
