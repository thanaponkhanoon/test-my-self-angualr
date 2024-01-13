import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public local: LocalStorageService) { }
  getRole() {
    if (this.local.get('user') === null) {
      return "notLogin"
    }
    return this.local.get('user').result.role
    
  }
  ngOnInit(): void {
  }

}
