import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RepositoriesService } from 'src/app/services/repositories.service';
import { ApiService } from "../../../services/api.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  repositories = null;
  constructor(
    private notif: ToastrService,
    public auth: ApiService,
    private _RS: RepositoriesService) { }

  ngOnInit() {
    this.userRepositories();
  }

  userRepositories() {
    this._RS.userRepositories().subscribe((repo) => {
      if (repo.success === true) {
        this.repositories = repo.data.length;
        // console.log('bhjkl', repo.data.length);


      }
    }, (error) => {
      this.notif.error(
        'Something went wrong'
      )
    })
  }


}
