import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.http.get<Patient[]>(this.baseApiUrl + '/api/Patients/all');
  }

  getDoctorsPatients(doctor: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(
      this.baseApiUrl + '/api/Patients/' + doctor
    );
  }

  addNewPatient(patient: Partial<Patient>): Observable<Patient> {
    return this.http.post<Patient>(this.baseApiUrl + '/api/Patients', patient);
  }

  editPatient(
    id: string | null | undefined,
    patient: Partial<Patient>
  ): Observable<Patient> {
    return this.http.put<Patient>(
      this.baseApiUrl + '/api/Patients/' + id,
      patient
    );
  }

  deletePatient(id: string | null | undefined): Observable<Patient> {
    return this.http.delete<Patient>(this.baseApiUrl + '/api/Patients/' + id);
  }

  getFilteredPatients(name: string): Observable<Patient[]> {
    let params = new HttpParams();
    
    if (name) {
      params = params.set('name', name);
    }

    return this.http.get<Patient[]>(`${this.baseApiUrl}/api/Patients/filtered`, { params });
  }
}
