import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ApiService } from "../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {

  constructor(private apiService: ApiService) { }

  public userRepositories(): Observable<any> {
    return this.apiService.request('get', 'repositories', null)
  }

  public checkDuplicateRepo(Repo): Observable<any> {
    return this.apiService.request('get', 'checkrepo',null, { Repo })
  }
}
