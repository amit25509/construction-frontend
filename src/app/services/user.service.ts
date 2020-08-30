import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from '../model/baseUrl.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(BaseUrl.baseUrl + 'api/test/all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(BaseUrl.baseUrl + 'api/test/user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(BaseUrl.baseUrl + 'api/test/mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(BaseUrl.baseUrl + 'api/test/admin', { responseType: 'text' });
  }

  public getUserByOccupation(occupationId){
    return this.http.get(`${BaseUrl.baseUrl+'user/getallbyoccupation'}/${occupationId}`);
  }

}