import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BookingComponent } from './booking/booking.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { HomeNavBarComponent } from './home-nav-bar/home-nav-bar.component';
import { AuthGuard } from './_helpers/authGuard';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { AdminCommissionComponent } from './admin/admin-commission/admin-commission.component';
import { AdminBookingComponent } from './admin/admin-booking/admin-booking.component';
import { HomeComponent } from './construction/home/home.component';
import { ConstructionServicesComponent } from './construction/construction-services/construction-services.component';
import { ElectricianComponent } from './construction/construction-services/electrician/electrician.component';
import { NewBookingComponent } from './construction/construction-services/new-booking/new-booking.component';
import { UserBookingComponent } from './user/user-booking/user-booking.component';

const routes: Routes = [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'board-user', component: BoardUserComponent },

  {
    path: 'construction', component: HomeNavBarComponent,
    children: [
      
      { path: 'home', component: HomeComponent },
      { path: 'electrician', component: ElectricianComponent },
      { path: 'new-booking', canActivate: [AuthGuard],component: NewBookingComponent },
    ]
  },
  {
    path: 'employee', component: HomeNavBarComponent,
    children: [
      { path: 'booking', canActivate: [AuthGuard], component: BookingComponent },
      { path: 'commission', canActivate: [AuthGuard], component: CommissionsComponent },
      { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },

    ]
  },
  {
    path: 'admin', component: HomeNavBarComponent,
    children: [
      { path: 'user-management', canActivate: [AuthGuard], component: UserManagementComponent },
      { path: 'booking-management', canActivate: [AuthGuard], component: AdminBookingComponent },
      { path: 'commission-management', canActivate: [AuthGuard], component: AdminCommissionComponent },
      { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
    ]
  },
  {
    path: 'user', component: HomeNavBarComponent,
    children: [
      { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
      { path: 'booking', canActivate: [AuthGuard],component: UserBookingComponent },
    ]
  },

  { path: '', redirectTo: 'construction/home', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }