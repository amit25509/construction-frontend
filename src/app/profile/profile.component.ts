import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../model/user.model';
import { ProfileService } from '../services/profile.service';
import { Address } from '../model/address.model';
import { UpdatePassword } from '../model/update-password.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  user: any;
  addresstemp:any;
  myErrorMsg: string;
  userDetails: User=new User;
  dp: string;
  address: Address[];
  add: any;
  addressCount=0;

  myadd: any;
  addid: number;
  selectedFiles: FileList;
  flagGetAddress=false;






  constructor(private token: TokenStorageService,private profileService: ProfileService) {
   }


  ngOnInit() {
    this.retrieveUserDetails();
    this.currentUser = this.token.getUser();
  }

  public retrieveUserDetails() {
    this.profileService.getUserDetails()
    .subscribe(
      userData => {
        this.user = userData;
        this.userDetails= this.user.data;
        //this.id=this.userData.addressId.addressId;
        // this.myadd= this.userDetails[0];
        // this.addid= this.myadd.addressId.addressId;
        if(this.userDetails.image!=null){
          this.dp = this.userDetails.image;
        }else{
          this.dp = 'data:image/png;base64,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';
        }
        console.log(this.userDetails);
      },
      (myError) => {
        console.log(myError);
        this.myErrorMsg = myError;
      }
    );
  }

  updateProfile() {
    this.profileService.updateProfile(this.userDetails[0]).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },
      err => {
        console.log("Data Sent"+this.userDetails[0]);
        console.log(err);
      }
    );
  }

  

  popUp(){
    alert("Updated Successfully");
    this.retrieveUserDetails();
    console.log(this.token.getUser());    
  }


  updateAvailability(availability) {
    this.profileService.updateAvailability(availability).subscribe(
      data => {
        console.log(availability);
      },
      err => {
        console.log(this.user);
        console.log(err);
      }
    );
  }

  getAddressCount()
  {
    return this.addressCount++;
  }
  setAddressCount()
  {
    this.addressCount=0;
  }

  setSelectedAddress(address)
  {
    this.addForm.setValue(address);
  }
  addAddress(){
    this.addForm.reset();
  }


  // UPDATE PASSWORD
  passwordModel: UpdatePassword= new UpdatePassword;
  isPasswordSucceful: boolean;
  isPasswordFailed: boolean;
  updatePasswordMessage: string;
  updatePassword(){
    console.log(this.passwordModel.oldPassword + " | " + this.passwordModel.newPassword);
      this.profileService.updatePassword(this.passwordModel).subscribe(
        data => {
          this.isPasswordSucceful = true;
          this.isPasswordFailed = false;
          this.updatePasswordMessage="Password Updated Successfully";
        },
        err => {
          this.updatePasswordMessage = "Old Password is incorrect";
        }
      );
  }

  // GET ADDRESS BY USERNAME
  public getAddressByUsername() {
    if(this.address==null || this.flagGetAddress==true){
      this.profileService.getAddressByUsername()
    .subscribe(
      data => {
        this.addresstemp = data;
        this.address= this.addresstemp.data;
        console.log(this.address)
      },
      (myError) => {
        console.log(myError);
        this.myErrorMsg = myError;
      }
    );
    }
  }

addForm= new FormGroup({
  addressId:new FormControl(),
  buildingName: new FormControl(),
  street: new FormControl(),
  city: new FormControl(),
  postalCode: new FormControl(),
  state: new FormControl(),
  isPrimary: new FormControl()
})


// UPDATE ADDRESS BY ADDRESS_ID
updatedAddressMessage: string;
addUpdateAddressById() {
  if(this.addForm.value.addressId==null){
    this.flagGetAddress=true;
    console.log("flaggggggg"+this.flagGetAddress);
    this.profileService.addNewAddress(this.addForm.value).subscribe(
      data => {
        this.updatePasswordMessage = 'Address Added Successfully';
        console.log('Data Sent' + this.addForm.value);
        this.getAddressByUsername();
        this.flagGetAddress = false;
      },
      err => {
        this.updatePasswordMessage=" Failed";
        console.log("Data Failed"+this.addForm);
        console.log(err);
      }
    );
  }
  else{
    this.flagGetAddress=true;
    console.log("flaggggggg uuu"+this.flagGetAddress);
    this.profileService.updateAddressById(this.addForm.value,this.addForm.value.addressId).subscribe(
      data => {
        this.updatePasswordMessage="Address Updated Successfully";
        console.log("Data Sent"+this.addForm.value);
        this.getAddressByUsername();
        this.flagGetAddress=false;
      },
      err => {
        this.updatePasswordMessage="Address Update Failed";
        console.log("Data Failed"+this.addForm);
        console.log(err);
      }
    );
  }  
}

// DELETE ADDRESS BY ADDRESS ID
deleteAddress(address23){
  let adid= address23.addressId;
  this.profileService.deleteAddress(adid).subscribe(
    data => {
      this.flagGetAddress=true;
      this.getAddressByUsername();
        this.flagGetAddress=false;
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
}


}