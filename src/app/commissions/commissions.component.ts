import { Component, OnInit, ViewChild } from '@angular/core';
import { Commissions } from '../model/commissions.model';
import { CommissionsService } from '../services/commissions.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css']
})
export class CommissionsComponent implements OnInit {

  allCommissions: Commissions[];
  myErrorMsg: string;
  viewedBooking:any;
  getViewedBooking:any;
  totalAmount=0;
  totalDue=0;


  allCommissionsObject: any;

  displayedColumns: string[] = ['commissionId','bookingId', 'totalCommissionAmount','dueCommissionAmount', 'commissionStatus','show'];
  dataSource = new MatTableDataSource<Commissions>(this.allCommissions);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private commissionsService: CommissionsService) { }

  ngOnInit() {
    this.retrieveAllCommissions();
    this.dataSource.sort= this.sort;
    this.dataSource.paginator= this.paginator;
  }

  public retrieveAllCommissions() {
    
    this.commissionsService.getAllCommissions()
    .subscribe(
      (commissionsData) => {
        this.allCommissionsObject = commissionsData;
        this.allCommissions= this.allCommissionsObject.data;
        this.dataSource.data = this.allCommissions as Commissions[];
        this.setTotalCommission(this.allCommissions);
      },
      (myError) => {
        console.log(myError);
        this.myErrorMsg = myError;
      }
    );
  }

  retrieveBookingById()
  {
    this.commissionsService.getBookingById(this.viewedBooking)
    .subscribe(
      data=>{
        this.getViewedBooking=data;
        console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  setViewedBooking(viewedBooking)
  {
    this.viewedBooking=viewedBooking;
  }

   //for deleting or navigating 
   logData(row){
    console.log(row);
  }

  applyFilter(FilterValue: string){
    this.dataSource.filter= FilterValue.trim().toLowerCase();
  }

  setTotalCommission(allCommissions){
       this.allCommissions.forEach(obj => {
        this.totalAmount=this.totalAmount+obj.totalCommissionAmount;
        this.totalDue=this.totalDue+obj.totalCommissionAmount;     
      });
      console.log("TOTAL AMOUNT"+this.totalAmount);
      console.log("TOTAL DUE"+this.totalDue);
  }
}
