import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RepositoriesService } from 'src/app/services/repositories.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {
  repositories = [];
  constructor(private _RS: RepositoriesService,
    private notif: ToastrService) { }

  ngOnInit() {
    this.userRepositories();
  }

  userRepositories() {
    this._RS.userRepositories().subscribe((repo) => {
      if (repo.success === true) {
        this.repositories = repo.data;
        console.log('ghjkjhjk',this.repositories);
        
      }
    }, (error) => {
      this.notif.error(
        'Something went wrong'
      )
    })
  }

  copyToClipboard(name): void {
    let item = "git clone peacegit@3.84.28.223:/home/peacegit/"+name+".git"
    let listener = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
    };

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);

    this.notif.success(
      "Copied!"
    )
  }

}
