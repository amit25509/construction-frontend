import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { BaseUrl } from '../model/baseUrl.model';
import { Address } from '../model/address.model';
import { UpdatePassword } from '../model/update-password.model';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public getUserDetails(): Observable<User[]> {
    return this.http.get(BaseUrl.baseUrl+'user/getbyusername')
    .pipe(map((userData: User[]) => {
        return userData;
      }),
    catchError(
      (error: Response) => throwError(error)
    )
    );
  }
  
  public updateAddressById(address,id): Observable<Address> {
    return this.http.put(`${BaseUrl.baseUrl+'address/updatebyid'}/${id}`,address)
    .pipe(map((data: Address) => {
        return data;
      }),
    catchError(
      (error: Response) => throwError(error)
    )
    );
  }

  updateProfile(user): Observable<any> {
    return this.http.put(BaseUrl.baseUrl+'user/updatebyusername', user);
  }

  

  updateAvailability(availability): Observable<any> {
    return this.http.put(BaseUrl.baseUrl+'employeedata/updateavailability',{availability});
  }



  public updatePassword(password): Observable<UpdatePassword> {
    return this.http.put(BaseUrl.baseUrl+'user/updatepassword',password)
    .pipe(map((data: UpdatePassword) => {
        return data;
      }),
    catchError(
      (error: Response) => throwError(error)
    )
    );
  }

  // GET ADDRESS BY USERNAME
  public getAddressByUsername(): Observable<Address[]> {
    return this.http.get(BaseUrl.baseUrl+'address/getbyusername')
    .pipe(map((addData: Address[]) => {
        return addData;
      }),
    catchError(
      (error: Response) => throwError(error)
    )
    );
  }

  // ADD NEW ADDRESS BY USERNAME
  public addNewAddress(address): Observable<Address> {
    return this.http.post(BaseUrl.baseUrl+'address/addadressbyusername',address)
    .pipe(map((data: Address) => {
        return data;
      }),
    catchError(
      (error: Response) => throwError(error)
    )
    );
  }

   // DELETE ADDRESS BY ADDRESS ID
   public deleteAddress(id): Observable<Address> {
    return this.http.delete(`${BaseUrl.baseUrl+'address/deletebyid'}/${id}`)
    .pipe(map((data: Address) => {
        return data;
      }),
    catchError(
      (error: Response) => throwError(error)
    )
    );
  }
}
