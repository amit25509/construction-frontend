import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Booking } from '../model/booking.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  allBookingsObject: any;
  myErrorMsg: string;
  allBookings: Booking[];

  displayedColumns: string[] = ['bookingId', 'bookingFrom','bookingTo', 'status', 'daysWorked', 'user'];
  dataSource = new MatTableDataSource<Booking>(this.allBookings);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private bookingService: BookingService) { }

  ngOnInit(){
    this.retrieveAllBookings();
    this.dataSource.sort= this.sort;
    this.dataSource.paginator= this.paginator;
    
  }

  public retrieveAllBookings() {
    this.bookingService.getBooking()
    .subscribe(
      bookingData => {
        this.allBookingsObject = bookingData;
        this.allBookings= this.allBookingsObject.data;
        this.dataSource.data = this.allBookings as Booking[];
        console.log(this.allBookings);
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
