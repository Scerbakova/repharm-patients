import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  name: string = '';
  surname: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.name === 'Jane' && this.surname === 'Brown') {
      localStorage.setItem('name', this.name);
      localStorage.setItem('surname', this.surname);
      this.router.navigate(['/all-patients-list']);
    }
    else {
      alert('Invalid Name or Surname');
    }
  }
}
