import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Occupation } from 'src/app/model/occupation.model';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

declare const  popUp: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  allOccupation: Occupation[];
  occupationObj: any;
  myErrorMsg: string;

  allUsers: User[];
  userObj: any;

  constructor(private authService: AuthService, private userServie: UserService) { }

  ngOnInit() {
    this.retrieveAllOccupations();
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


  public retrieveAllByOccupation(occupationId) {
    this.userServie.getUserByOccupation(occupationId)
    .subscribe(
      (userData) => {
        this.userObj = userData;
        this.allUsers= this.userObj.data;
        console.log(userData);
        console.log(this.allUsers);
      },
      (myError) => {
        console.log(myError);
        this.myErrorMsg = myError;
      }
    );
  }
}
