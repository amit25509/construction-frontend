import { Component, OnInit, Input } from '@angular/core';
import { ConstructionServicesService } from '../services/construction-services.service';
import { User } from 'src/app/model/user.model';
import { Booking } from 'src/app/model/booking.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { Address } from 'src/app/model/address.model';
import { ProfileService } from 'src/app/services/profile.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit {

  // @Input()
  serviceType: string;

  allUsers: User[];
  userObj: any;
  bookingModel: Booking = new Booking();
  user: User = new User();
  myErrorMsg: any;
  service = '';
  address: Address[];
  selectedAddress: Address;
  selectedEmployee: User;
  isNewAddHideen = true;
  addShowAdd = 'Add New Address';
  


  newBookingForm = this.fb.group({
    bookingFrom : [''],
    bookingTo : [''],
    description : [''],
    address : this.fb.group({
      buildingName : [''],
      street : [''],
      city :  [''],
      state : [''],
      postalCode : ['']
    })
  });

  newAddDisplay() {
    this.isNewAddHideen = !this.isNewAddHideen;
    if (this.isNewAddHideen === false){
      this.addShowAdd = 'Show Saved Address';
    }
    if (this.isNewAddHideen === true){
      this.addShowAdd = 'Add New Address';
    }
  }

  constructor(
    private router: Router, private constructionService: ConstructionServicesService, private tokenStorageService: TokenStorageService,
    private profileService: ProfileService, private fb: FormBuilder) {
    this.serviceType = this.constructionService.getMessage();
    console.log('new booking' + this.serviceType);
  }

  ngOnInit() {
    const user = this.tokenStorageService.getUser();  // Getting User
    this.user.id = user.id;
    this.service = window.sessionStorage.getItem('service');
    this.getAddressByUsername();
  }


  public retrieveAllByOccupation() {
      this.constructionService.getUserByOccupation(this.service)
        .subscribe(
          (userData) => {
            this.userObj = userData;
            this.allUsers = this.userObj.data;
            // console.log(userData);
            // console.log(this.allUsers);
          },
          (myError) => {
            console.log(myError);
            this.myErrorMsg = myError;
          }
        );
    }

  onSubmit() {
    console.log('1');
    this.bookingModel = this.newBookingForm.value;
    this.bookingModel.user = this.user;
    this.bookingModel.employee = this.user;
    this.bookingModel.service = this.service;
    this.bookingModel.subService = this.serviceType;
    if (this.selectedAddress != null){
      this.bookingModel.address = this.selectedAddress;
    }
    console.log(this.bookingModel);
    this.constructionService.addBooking(this.bookingModel).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl("user/booking");
      },
      err => {
        console.log('ERRORRRRR');
        console.log(this.bookingModel);
        // console.log('addrrr' + this.newBookingForm);
      }
    );
  }

  public setSelectedEmployee(employee) {
    this.bookingModel.employee = employee;
  }

  public setSelectedAddress(add) {
    console.log(add);
    this.selectedAddress = add;
  }

  // GET ADDRESS BY USERNAME
  public getAddressByUsername() {
    if(this.address == null){
      this.profileService.getAddressByUsername()
    .subscribe(
      data => {
        const  addresstemp: any = data;
        this.address = addresstemp.data;
        console.log(this.address);
      },
      (myError) => {
        console.log(myError);
        this.myErrorMsg = myError;
      }
    );
    }
  }

}
