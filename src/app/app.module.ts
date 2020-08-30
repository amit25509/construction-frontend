import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { ProfileComponent } from './profile/profile.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BookingComponent } from './booking/booking.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { HomeNavBarComponent } from './home-nav-bar/home-nav-bar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthGuard } from './_helpers/authGuard';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { AdminBookingComponent } from './admin/admin-booking/admin-booking.component';
import { AdminCommissionComponent } from './admin/admin-commission/admin-commission.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { ChartsModule } from 'ng2-charts';
import { HomeComponent } from './construction/home/home.component';
import { ConstructionServicesComponent } from './construction/construction-services/construction-services.component';
import { ElectricianComponent } from './construction/construction-services/electrician/electrician.component';
import { NewBookingComponent } from './construction/construction-services/new-booking/new-booking.component';
import { FooterComponent } from './home-nav-bar/footer/footer.component';
import { UserBookingComponent } from './user/user-booking/user-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BoardAdminComponent,
    BoardUserComponent,
    BoardModeratorComponent,
    ProfileComponent,
    BookingComponent,
    CommissionsComponent,
    HomeNavBarComponent,
    UserManagementComponent,
    AdminBookingComponent,
    AdminCommissionComponent,
    HomeComponent,
    ConstructionServicesComponent,
    ElectricianComponent,
    NewBookingComponent,
    FooterComponent,
    UserBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ChartsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  providers: [authInterceptorProviders,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }