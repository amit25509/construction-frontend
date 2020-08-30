import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/model/user.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserManagementComponent implements OnInit {

  temp:any;
  myErrorMsg: any;
  test=false;

  allUserObject: any;
  allUser: User[];

  viewedUserId: any;
  newUser: User[];

  expandedElement: User | null;
  columnsToDisplay: string[] = ['id', 'name','phone', 'locationId', 'roles', 
                            'createdDate','lastModifiedDate','lastModifiedBy','isEnabled','action'];
  dataSource = new MatTableDataSource<User>(this.allUser);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.retrieveAllUsers();
    this.dataSource.sort= this.sort;
    this.dataSource.paginator= this.paginator;
  }
  
  public retrieveAllUsers() {
    this.adminService.getAllUsers()
    .subscribe(
      userData => {
        this.allUserObject = userData;
        this.allUser= this.allUserObject.data;
        this.dataSource.data = this.allUser as User[];
        console.log(this.allUser);
      },
      (myError) => {
        console.log(myError);
        this.myErrorMsg = myError;
      }
    );
  }

  userEnableDisable(id,isEnabled) {
    this.adminService.userEnableDisable(id,isEnabled).subscribe(
      data => {
        console.log(isEnabled);
      },
      err => {
        console.log(err);
      }
    );
  }

  userDelete() {
    this.adminService.userDeleteById(this.viewedUserId).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }


  logData(row){
    console.log(row);
  }

  applyFilter(FilterValue: string){
    this.dataSource.filter= FilterValue.trim().toLowerCase();
  }

  setViewedUser(id) {
    this.viewedUserId = id;
    console.log("ID is:" + id);
    this.newUser = this.allUser.filter(
      (user: User) => user.id === id);
      console.log("new  is:" + this.newUser);
  }

  updateUser() {
    this.adminService.updateUser(this.viewedUserId, this.newUser[0]).subscribe(
      data => {
        console.log(data);
        // window.location.reload();
        window.close();
      },
      err => {
        console.log("Data Error" + this.newUser);
        console.log(err);
      }
    );
  }
}
