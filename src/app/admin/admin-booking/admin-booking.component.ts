import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Booking } from 'src/app/model/booking.model';
import { AdminService } from '../service/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ConstructionServicesService } from 'src/app/construction/construction-services/services/construction-services.service';
import { User } from 'src/app/model/user.model';



@Component({
  selector: 'app-admin-booking',
  templateUrl: './admin-booking.component.html',
  styleUrls: ['./admin-booking.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminBookingComponent implements OnInit {

  allBookingObject: any;
  allBookings: Booking[];
  myErrorMsg: any;
  viewBookingId: any;
  newBooking: Booking[];

  allUsers: string[];
  userObj: any;


  myControl = new FormControl();
  options:string[];
  filteredOptions: Observable<string[]>;

  
  expandedElement: Booking | null;
  columnsToDisplay: string[] = ['bookingId', 'bookingFrom', 'bookingTo', 'daysWorked', 'rating',
    'status', 'user', 'employee', 'action'];
  dataSource = new MatTableDataSource<Booking>(this.allBookings);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private adminService: AdminService,private constructionService: ConstructionServicesService) { 
    this.options=['']
  }


  ngOnInit() {
    this.retrieveAllBookings();
    this.retrieveAllEmployees();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  public retrieveAllBookings() {
    this.adminService.getAllBookings()
      .subscribe(
        bookingData => {
          this.allBookingObject = bookingData;
          this.allBookings = this.allBookingObject.data;
          console.log(this.allBookings);
          this.dataSource.data = this.allBookings as Booking[];
          
        },
        (myError) => {
          console.log(myError);
          this.myErrorMsg = myError;
        }
      );
  }

  public retrieveAllEmployees() {
    
    this.adminService.getAllEmployees()
      .subscribe(
        userData => {
          this.userObj = userData;
          this.options = this.userObj.data as string[];
          console.log(this.options);
        },
        (myError) => {
          console.log(myError);
          this.myErrorMsg = myError;
        }
      );
  }


  // Mat Table Console Log
  logData(row) {
    console.log(row);
  }
  // Mat Table Filter
  applyFilter(FilterValue: string) {
    this.dataSource.filter = FilterValue.trim().toLowerCase();
  }

  setViewedBooking(id) {
    this.viewBookingId = id;
    console.log("ID is:" + this.viewBookingId);
    this.newBooking = this.allBookings.filter(
      (book: Booking) => book.bookingId === id);
      console.log("new  is:" + this.newBooking);
  }

  updateBooking() {
    this.adminService.updateBooking(this.viewBookingId, this.newBooking[0]).subscribe(
      data => {
        console.log(data);
        // window.location.reload();
        window.close();
      },
      err => {
        console.log("Data Error" + this.newBooking);
        console.log(err);
      }
    );
  }
}
