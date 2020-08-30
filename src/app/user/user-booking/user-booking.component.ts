import { Component, OnInit, ViewChild } from '@angular/core';
import { Booking } from 'src/app/model/booking.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css']
})
export class UserBookingComponent implements OnInit {

  allBookingsObject: any;
  myErrorMsg: string;
  allBookings: Booking[];

  displayedColumns: string[] = ['bookingId', 'bookingFrom','bookingTo', 'status', 'daysWorked', 'employee'];
  dataSource = new MatTableDataSource<Booking>(this.allBookings);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private customerService: CustomerService) { }

  ngOnInit(){
    console.log("user-Booking");
    this.retrieveAllBookings();
    this.dataSource.sort= this.sort;
    this.dataSource.paginator= this.paginator;
    
  }

  public retrieveAllBookings() {
    this.customerService.getBooking()
    .subscribe(
      bookingData => {
        this.allBookingsObject = bookingData;
        this.allBookings= this.allBookingsObject.data;
        this.dataSource.data = this.allBookings as Booking[];
        console.log("Hello Bookinhg Test"+this.allBookings);
      },
      (myError) => {
        console.log(myError);
        this.myErrorMsg = myError;
      }
    );
  }

   //for deleting or navigating 
   logData(row){
    console.log(row);
  }

  applyFilter(FilterValue: string){
    this.dataSource.filter= FilterValue.trim().toLowerCase();
  }
}
