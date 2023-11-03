import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private userService: UserService) {}
  canActivate(): boolean {
    if (
      this.userService.user?.doctorsName &&
      this.userService.user?.doctorsSurname
    ) {
      return true;
    } else {
      return false;
    }
  }
}
