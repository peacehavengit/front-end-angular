import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";

declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  status: boolean;
  constructor(
    public auth :ApiService
  ) { }

  ngOnInit() {
    // alert("!!!!!!")
  }
  clickEvent() {
    this.status = !this.status;
  }
  

}

$(document).ready(function () {
  $("#sidebarCollapse").on("click", function () {
    $("#wrapper").toggleClass("active");
  });
});

$(document).ready(function () {
  $("#sidebar .list-unstyled ul .navClose").on("click", function () {
    $("#wrapper").removeClass("active");
  });
  $("#sidebar .list-unstyled .navClose").on("click", function () {
    $("#wrapper").removeClass("active");
  });
});

