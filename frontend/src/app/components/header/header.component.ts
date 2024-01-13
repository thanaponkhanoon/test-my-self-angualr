import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage'
import { CartService } from './../../services/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public local: LocalStorageService,private CartService: CartService) { }

  ngOnInit(): void {
  }

  
  getRole() {
    if (this.local.get('user') === null) {
      return "notLogin"
    }
    return this.local.get('user').result.role
    
  }
  getUser() {
    return this.local.get('user').result.name
  }
  logout() {
    this.local.clear()
  }

}
