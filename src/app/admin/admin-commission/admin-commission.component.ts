import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { Commissions } from 'src/app/model/commissions.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommissionsService } from 'src/app/services/commissions.service';
import { Booking } from 'src/app/model/booking.model';

@Component({
  selector: 'app-admin-commission',
  templateUrl: './admin-commission.component.html',
  styleUrls: ['./admin-commission.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminCommissionComponent implements OnInit {


  allCommissionObject: any;
  allCommissions: Commissions[];
  bookingObj: any;
  booking: Booking[];
  myErrorMsg: any;
  viewedCommissionId: any;
  newCommission: Commissions[];

  expandedElement: Commissions | null;
  columnsToDisplay: string[] = ['commissionId', 'bookingId', 'totalCommissionAmount', 'paidCommissionAmount',
    'dueCommissionAmount', 'commissionStatus', 'action'];
  dataSource = new MatTableDataSource<Commissions>(this.allCommissions);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private adminService: AdminService, private commissionsService: CommissionsService) { }

  ngOnInit() {
    this.retrieveAllCommissions();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public retrieveAllCommissions() {
    this.adminService.getAllCommissions()
      .subscribe(
        commissionsData => {
          this.allCommissionObject = commissionsData;
          this.allCommissions = this.allCommissionObject.data;
          this.dataSource.data = this.allCommissions as Commissions[];
          console.log(this.allCommissions);
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


  public pieChartLabels: string[] = ['Total Commission', 'Due', 'Paid', 'Internet Explorer', 'Other'];
  public pieChartData: number[] = [40, 20, 20, 10, 10];
  public pieChartType: string = 'pie';
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  setViewedCommission(id) {
    this.viewedCommissionId = id;
    console.log("ID is:" + this.allCommissions);
    this.newCommission = this.allCommissions.filter(
      (book: Commissions) => book.commissionId === id);
      console.log("new  is:" + this.newCommission);
  }

  updateCommission() {
    this.adminService.updateCommision(this.viewedCommissionId, this.newCommission[0]).subscribe(
      data => {
        console.log(data);
        // window.location.reload();
        window.close();
      },
      err => {
        console.log("Data Error" + this.newCommission);
        console.log(err);
      }
    );
  }
}
