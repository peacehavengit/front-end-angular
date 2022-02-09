import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ApiService } from "../services/api.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
    private apiService: ApiService) { }

  public registration(user): Observable<any> {
    // console.log('service data', user);
    return this.apiService.request('post', 'signup', user)
  }

  public login(user): Observable<any> {
    return this.apiService.request('post', 'login', user)
  }


  public checktest(repoObj): Observable<any> {
    return this.apiService.request('post', 'childprocess', repoObj)
  }





}
