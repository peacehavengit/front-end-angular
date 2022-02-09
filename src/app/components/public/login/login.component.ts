import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // error object
  errorObj = {
    email: '',
    password: '',
  };
  // Object for customer login
  loginObj = {
    email: '',
    password: '',
    _csrf: null,
  };
  constructor(private UserService: UserService,
    private notif: ToastrService,
    private router: Router,
    private actroute: ActivatedRoute) { }

  ngOnInit() {
  }


  // Function to remove validation error
  clearError(field) {
    switch (field) {

      case 'email':
        this.errorObj.email = '';
        break;
      case 'password':
        this.errorObj.password = '';
        break;
    }
  }

  // function for user login
  loginfn() {
    // this.loading = true;
    this.UserService.login(this.loginObj).subscribe((success) => {
      if (typeof success.token !== 'undefined' && success.token && success.token !== '') {
        // this.loading = false;
        this.notif.success(
          success.message
        )
        this.router.navigateByUrl('/dashboard');
      } else {
        this.notif.error(
          success.message
        )
      }
    }, (error) => {
      // this.loading = false;
      this.notif.error(
        error.message,
      )
    })
  }

 

}
