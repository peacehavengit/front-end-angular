import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Globals } from '../global';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class KycGuard implements CanActivate {
  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private userService: UserService,
    private toastMessage: ToastrService,
    public global: Globals
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.apiService.isLoggedIn()) {
      if(this.global.kycStatus != 'Verified'){
        this.apiService.getKycStatus().subscribe((response) => {
          if(response.success){
            this.global.isKyc = true;
            this.global.kycStatus = response.data.kyc;
            if(response.data.kyc == "Verified"){
              this.router.navigate([state.url]);
            }else if(response.data.kyc == ""){
              this.toastMessage.warning(
                  response.message
              )
              this.router.navigate(['/kyc']);
            }else if(response.data.kyc == "Pending"){
              this.toastMessage.warning(
                  response.message
              )
              this.router.navigate(['/kyc']);
            }else{
              this.toastMessage.warning(
                  response.message
              )
              this.router.navigate(['/kyc']);
            }
          }else{
              this.apiService.logout()
          }
        },(err) => {
          this.apiService.logout()
        })
      }else{
        return true
      }
      
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
