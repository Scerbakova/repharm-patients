import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AllPatientsComponent } from './components/patients/all-patients/all-patients.component';
import { MyPatientsComponent } from './components/patients/my-patients/my-patients.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { BoolRepresentationPipe } from './pipes/bool-representation.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AllPatientsComponent,
    MyPatientsComponent,
    RegistrationFormComponent,
    BoolRepresentationPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'all-patients-list', component: AllPatientsComponent, pathMatch: 'full' },
      { path: 'my-patients-list', component: MyPatientsComponent, pathMatch: 'full' },
      { path: '', component: RegistrationFormComponent, pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
