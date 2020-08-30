
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Locations } from '../model/locations.model';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { Occupation } from '../model/occupation.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userModel: User = new User();
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  allLocations: Locations[];
  locationObj: any;
  allOccupation: Occupation[];
  occupationObj: any;
  myErrorMsg: string;
  type="user";
  options:any;

  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.retrieveAllLocations();
    this.retrieveAllOccupations();
  }

  onSubmit() {
    if(this.type==="user")
    {
      this.userModel.employeeData=null;
      this.userModel.roles=["user"];
    }
    else{
      this.userModel.roles=["emp"];
    }

    this.authService.register(this.userModel).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['login']);
        console.log( "role" + this.userModel.roles[0]);
        console.log( "Test" + this.userModel.password);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        console.log(err);
        console.log(this.userModel);
      }
    );
  }

  public retrieveAllLocations() {
    this.authService.getAllLocations()
    .subscribe(
      (locationData) => {
        this.locationObj = locationData;
        this.allLocations= this.locationObj.data;
        console.log(locationData);
        console.log(this.allLocations);
      },
      (myError) => {
        console.log(myError);
        this.myErrorMsg = myError;
      }
    );
  }

  public retrieveAllOccupations() {
    this.authService.getAllOccupations()
    .subscribe(
      (occupationData) => {
        this.occupationObj = occupationData;
        this.allOccupation= this.occupationObj.data;
        console.log(occupationData);
        console.log(this.allOccupation);
      },
      (myError) => {
        console.log(myError);
        this.myErrorMsg = myError;
      }
    );
  }

    setTypeUser()
    {
      this.type="user"
      console.log(this.userModel.roles);
    }

    setTypeEmployee()
    {
      this.type='employee';
      console.log(this.userModel.roles);
    }


    // public show:boolean = false;
    // public buttonName:any = 'Show';

    // toggle() {
    //   this.show = !this.show;
  
    //   // CHANGE THE NAME OF THE BUTTON.
    //   if(this.show) {
    //     this.buttonName = 'Hide';
    //   } else {
    //     this.buttonName = 'Show';
    //   }
    // }
  
}
