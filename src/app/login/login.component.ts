import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage : string;
  roles: string[] = [];
  phone: null;
  password:'';
  nrememberMe:boolean =false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    this.authService.login(this.phone,this.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.data.accessToken);
        this.tokenStorage.saveUser(data.data);
        if(this.nrememberMe){
          this.tokenStorage.setRememberMe(data.data.accessToken);
          this.tokenStorage.saveUserLocal(data.data);
        }
        
        console.log("data and data"+data.data)

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        if(this.roles.includes('ROLE_EMPLOYEE')){
          this.router.navigate(['employee/booking']);
        }
        else if(this.roles.includes('ROLE_ADMIN')){
          this.router.navigate(['admin/user-management']);
        }
        else if(this.roles.includes('ROLE_USER')){
          this.router.navigate(['construction/home']);
        }
        
        // .then(() => {
        //   window.location.reload();
        // });

        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.errorMessage='Invalid Phone or Password';
      }
    );
  }

  rememberMe()
  {
    console.log("inside remember me");
    this.nrememberMe=true;
  }
}