import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AllPatientsComponent } from './pages/patients/all-patients/all-patients.component';
import { MyPatientsComponent } from './pages/patients/my-patients/my-patients.component';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { BoolRepresentationPipe } from './pipes/bool-representation.pipe';
import { TableComponent } from './components/table/table.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AllPatientsComponent,
    MyPatientsComponent,
    RegistrationFormComponent,
    BoolRepresentationPipe,
    TableComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'all-patients-list', component: AllPatientsComponent, pathMatch: 'full' },
      { path: 'my-patients-list', component: MyPatientsComponent, pathMatch: 'full' },
      { path: 'register-new-patient', component: RegistrationFormComponent, pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
