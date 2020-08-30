import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-home-nav-bar',
  templateUrl: './home-nav-bar.component.html',
  styleUrls: ['./home-nav-bar.component.css']
})
export class HomeNavBarComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  isLoggedInLocal=false;
  showAdminBoard = false;
  showEmployeeBoard = false;
  showUserBoard=false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.isLoggedInLocal= !!this.tokenStorageService.getRememberMe();


    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showEmployeeBoard = this.roles.includes('ROLE_EMPLOYEE');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.username = user.name;
    }
    else if(this.isLoggedInLocal){
      const user = this.tokenStorageService.getUserLocal();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showEmployeeBoard = this.roles.includes('ROLE_EMPLOYEE');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.name;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}