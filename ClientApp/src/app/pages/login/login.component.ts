import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  name: string = '';
  surname: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    if (this.name === 'Jane' && this.surname === 'Brown') {
      this.userService.setUser(this.name, this.surname);
      this.router.navigate(['/all-patients-list']);
    }
  }
}
