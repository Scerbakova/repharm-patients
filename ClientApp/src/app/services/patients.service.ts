import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseApiUrl + '/api/Patients');
  }

  getDoctorsPatients(doctor: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseApiUrl + '/api/Patients/' + doctor);
  }
}
