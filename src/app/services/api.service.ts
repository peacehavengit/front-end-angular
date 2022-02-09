import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
// import { UserService } from "../services/user.service";
import { ToastrService } from "ngx-toastr";


/*
    interface for token
 */
interface TokenResponse {
  token: string;
}


/*
  specific format of create user call reponse
*/
export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  userid: number;
  usercurrency: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api_url: string = environment.url;

  private kyc: string
  private token: string;
  public env: string;

  constructor(private http: HttpClient, private router: Router,
    private toastMessage: ToastrService) {
    this.env = this.getEnv();
  }

  /*
      save token into localStorage as a item with specific key
   */
  private saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('abschuendj', 'incomplete')
    this.token = token;
  }

  /*
      save env in localstorage
   */
  public saveEnv(val: string): void {
    localStorage.removeItem('env');
    localStorage.setItem('env', val);
    this.env = val;
  }

  /*
      call for fetch env from localStrogae
   */
  public getEnv(): string {

    if (!this.env) {
      this.env = localStorage.getItem('env');
    }
    return this.env;
  }

  /*
      call for fetch token from localStrogae
   */
  private getToken(): string {

    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  /*
      fetch user token details
   */
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  /*
      call for check the user session
   */
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  // Get kyc status of the user
  public getKycStatus(): Observable<any> {
    return this.request('get', 'kycStatus')
  }


  public isKycApproved() {
    this.getKycStatus().subscribe((response) => {
      if (response.success) {
        if (response.data.kyc == "Verified") {
          return true;
        } else if (response.data.kyc == "") {
          this.toastMessage.warning(
            response.message
          )
          this.router.navigate(['/kyc']);
        } else if (response.data.kyc == "Pending") {
          this.toastMessage.warning(
            response.message
          )
          this.router.navigate(['/kyc']);
        } else {
          this.toastMessage.warning(
            response.message
          )
          this.router.navigate(['/kyc']);
        }
      } else {
        this.logout()
      }
    }, (err) => {
      this.logout()
    })


  }

  /*
      all type of api call handlers at client side and send token in header in all GET api call to verify valid user
      application at back end match user token with this token, if both token are match means this is a valid user otherwise
      return with a exception invalid user
   */
  public request(method: 'post' | 'get', type, user?, paramslist?): Observable<any> {
    console.log("method ", method, "type ", type, user, paramslist);

    if (type === 'registration' || type === 'login') {
      return this.http.post<any>(this.api_url + 'users/' + type, user)
        .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('auth_token', user.token);
          }

          return user;
        }));
    } else {
      let base;
      if (method === 'post') {
        base = this.http.post<any>(this.api_url + 'users/' + type, user, {
          headers: { Authorization: `Bearer ${this.getToken()}` }
        });
      } else {
        console.log('hit it');

        base = this.http.get<any>(this.api_url + 'users/' + type, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
          params: paramslist
        });
      }
      const request = base.pipe(
        map((data: TokenResponse) => {
          if (data !== null && data.token) {
            this.saveToken(data.token);
          }
          return data;
        })
      );
      return request;
    }
  }

  //headers: {'env':this.cookieService.get('env')}
  // public externalrequest(method: 'post' | 'get', type, user?, paramslist?): Observable<any> {
  //     if (method === 'get') {
  //         return this.http.get<any>(this.api_url + type, {withCredentials: true, params: paramslist});
  //     } else {
  //         return this.http.post<any>(this.api_url + type, user, {withCredentials: true, params: paramslist});
  //     }
  // }

  //,'env':this.cookieService.get('env')


  public gtcsrf(): Observable<any> {
    return this.http.get<any>(this.api_url + 'getcsrf', { withCredentials: true });
  }

  public logout(): void {
    this.env = '';
    this.token = '';
    window.localStorage.removeItem('env');
    window.localStorage.removeItem('auth_token');
    this.router.navigateByUrl('/');
  }

}
