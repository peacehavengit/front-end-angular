import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from "../../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // Object for register customer
  userobj = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    cpassword: '',
    _csrf: null,
  };
  // error object
  errorObj = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    cpassword: '',

  };
  loading = false;
  constructor(private UserService: UserService,
    private router: Router,
    private actroute: ActivatedRoute,
    private notif: ToastrService) { }

  ngOnInit() {
  }

  clearError(field) {
    switch (field) {
      case 'fname':
        this.errorObj.fname = '';
        break;
      case 'lname':
        this.errorObj.fname = '';
        break;
      case 'email':
        this.errorObj.email = '';
        break;
      case 'password':
        this.errorObj.password = '';
        break;
      case 'cpassword':
        this.errorObj.cpassword = '';
        break;


    }
  }

  //  Registration function for customer
  registration(signup: NgForm) {
    if (this.userobj.password && this.userobj.cpassword && (this.userobj.password !== this.userobj.cpassword)) {
      this.errorObj.cpassword = "Password does not match";
      return false;
    }
    this.loading = true;
    console.log('onj',this.userobj);
    
    this.UserService.registration(this.userobj).subscribe((success) => {
      if (success.success === true) {
        this.loading = false;
        this.notif.success(
          success.message
        )
        signup.reset();
        this.router.navigateByUrl('/');
      } else {
        this.loading = false;
        this.notif.error(
         success.message
        )
      }

    }, (error) => {
      this.loading = false;
      this.notif.error(
        error.message
      )
    })
  }

// function to call for password match with confirm password
  matchPassword(obj) {
    if (obj.password && obj.cpassword && (obj.password !== obj.cpassword)) {
      this.errorObj.cpassword = "Password does not match";
      return false;
    }
  }

}
