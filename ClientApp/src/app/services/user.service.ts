import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: { doctorsName: string; doctorsSurname: string } | null = null;

  setUser(doctorsName: string, doctorsSurname: string) {
    this.user = { doctorsName, doctorsSurname };
  }
}