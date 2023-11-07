import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AllPatientsComponent } from './pages/patients/all-patients/all-patients.component';
import { MyPatientsComponent } from './pages/patients/my-patients/my-patients.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { BoolRepresentationPipe } from './pipes/bool-representation.pipe';
import { TableComponent } from './components/table/table.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AllPatientsComponent,
    MyPatientsComponent,
    RegistrationFormComponent,
    BoolRepresentationPipe,
    TableComponent,
    LoginComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      {
        path: 'all-patients-list',
        component: AllPatientsComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'my-patients-list',
        component: MyPatientsComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
