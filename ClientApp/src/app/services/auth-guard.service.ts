import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  canActivate(): boolean {
    if (localStorage.getItem('name') === 'Jane' && localStorage.getItem('surname') === 'Brown') {
      return true;
    } else {
      return false;
    }
  }
}
