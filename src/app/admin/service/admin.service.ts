import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from 'src/app/model/baseUrl.model';
import { User } from 'src/app/model/user.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Booking } from 'src/app/model/booking.model';
import { Commissions } from 'src/app/model/commissions.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {

   }

   public getAllUsers(): Observable<User[]> {
    return this.http.get(BaseUrl.baseUrl+'admin/getall')
    .pipe(map((userData: User[]) => {
        return userData;
      }),
    catchError(
      (error: Response) => throwError(error)
    )
    );
  }

  public getAllBookings(): Observable<Booking[]> {
    return this.http.get(BaseUrl.baseUrl+'booking/getall')
    .pipe(map((data: Booking[]) => {
        return data;
      }),
    catchError(
      (error: Response) => throwError(error)
    )
    );
  }

  public getAllCommissions(): Observable<Commissions[]> {
    return this.http.get(BaseUrl.baseUrl+'commission/getall')
    .pipe(map((data: Commissions[]) => {
        return data;
      }),
    catchError(
      (error: Response) => throwError(error)
    )
    );
  }



  public getAllEmployees(): Observable<User[]> {
    return this.http.get(BaseUrl.baseUrl+'user/getallemployee')
    .pipe(map((data: User[]) => {
        return data;
      }),
    catchError(
      (error: Response) => throwError(error)
    )
    );
  }



  userEnableDisable(id,isEnable): Observable<any> {
    return this.http.put(`${BaseUrl.baseUrl+'admin/userenabledisable'}/${id}`,{isEnable});
  }

  userDeleteById(id): Observable<any> {
    return this.http.delete(`${BaseUrl.baseUrl+'admin/deletebyid'}/${id}`);
  }

  public getCommissionById(id){
    return this.http.get(`${BaseUrl.baseUrl+'commission/getbyid'}/${id}`);
  }

  public updateCommision(id,commission): Observable<any> {
    return this.http.put(`${BaseUrl.baseUrl+'commission/updatebyid'}/${id}`, commission);
  }

  public updateBooking(id,booking): Observable<any> {
    return this.http.put(`${BaseUrl.baseUrl+'booking/updatebyid'}/${id}`, booking);
  }

  public updateUser(id,user): Observable<any> {
    return this.http.put(`${BaseUrl.baseUrl+'user/updatebyid'}/${id}`, user);
  }
}
