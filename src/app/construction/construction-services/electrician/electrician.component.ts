import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { ConstructionServicesService } from '../services/construction-services.service';
import { Booking } from 'src/app/model/booking.model';
import { empty } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-electrician',
  templateUrl: './electrician.component.html',
  styleUrls: ['./electrician.component.css']
})
export class ElectricianComponent implements OnInit {

  myErrorMsg: string;

  allUsers: User[];
  userObj: any;
  selectedEmployee:null;
  bookingModel: Booking = new Booking();
  user: User = new User();
  serviceType:string;
  
  constructor(private constructionService:ConstructionServicesService,private tokenStorageService: TokenStorageService, private router:Router) {
   }

  ngOnInit() {
    const user = this.tokenStorageService.getUser();
    this.user.id=user.id;
    this.setService();
  }

  public retrieveAllByOccupation(occupationId) {
    this.constructionService.getUserByOccupation(occupationId)
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

  onSubmit() {
    
    this.bookingModel.user=this.user;
    this.constructionService.addBooking(this.bookingModel).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(this.bookingModel);
      }
    );
  }
  public setSelectedEmployee(employee)
  {
    this.bookingModel.employee=employee;
  }

  sendMessage(serviceType): void {
    this.constructionService.sendMessage(serviceType);
    console.log('elec '+serviceType)
    this.router.navigateByUrl('/construction/new-booking');
    }

    setService()
    {
      window.sessionStorage.setItem("service","Electrician");
    }
}
