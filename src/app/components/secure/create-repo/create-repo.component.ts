import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { RepositoriesService } from 'src/app/services/repositories.service';

@Component({
  selector: 'app-create-repo',
  templateUrl: './create-repo.component.html',
  styleUrls: ['./create-repo.component.css']
})
export class CreateRepoComponent implements OnInit {
  repoObj = {
    reponame: '',
    privacytype: '',
    adduser: ''
  }
  isRepoPresent = false;
  constructor(private _US: UserService,
    private notif: ToastrService,
    private router: Router,
    private _RS: RepositoriesService,) { }

  ngOnInit() {
  }

  Servertest() {
    if (this.isRepoPresent === false) {
      this._US.checktest(this.repoObj).subscribe((result) => {
        if (result.success === true) {
          this.notif.success(
            result.message
          )
          this.router.navigateByUrl('/repositories');
        } else {
          this.notif.error(
            result.message
          )
        }
      }, (error) => {
        this.notif.error(
          'Something Went Wrong'
        )
      })
    } else{
      this.notif.error(
       "Please use different name!!"
      )
    }

  }

  checkRepo(name) {
    this._RS.checkDuplicateRepo(name).subscribe((result) => {
      if (result.success === true) {
        this.isRepoPresent = result.data;

      }
    }, (error) => {
      this.notif.error(
        'Something went wrong'
      )

    })

  }

  // Function to remove validation error
  clearError(field) {
    switch (field) {
      case 'checkrepo':
        this.isRepoPresent = false;
        break;
    }
  }
}
