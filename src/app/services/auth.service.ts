import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError} from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { Locations } from '../model/locations.model';
import { BaseUrl } from '../model/baseUrl.model';
import { Occupation } from '../model/occupation.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username,password): Observable<any> {
    return this.http.post(BaseUrl.baseUrl + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(BaseUrl.baseUrl + 'signup',user, httpOptions);
  }

  public getAllLocations(): Observable<Locations[]> {
    return this.http.get(BaseUrl.baseUrl+'location/getall')
    .pipe(map((locationData: Locations[]) => {
        return locationData;
      }),
    catchError(
      (error: Response) => throwError(error)
    )
    );
  }

  public getAllOccupations(): Observable<Occupation[]> {
    return this.http.get(BaseUrl.baseUrl+'occupation/getall')
    .pipe(map((occupationData: Occupation[]) => {
        return occupationData;
      }),
    catchError(
      (error: Response) => throwError(error)
    )
    );
  }

  isAuthenticated() {
    // get the auth token from localStorage
    let token = sessionStorage.getItem('auth-token');
    let tokenLocal = localStorage.getItem('auth-token');


    // check if token is set, then...
    if (token || tokenLocal) {
        return true;
    }

    return false;
}
}