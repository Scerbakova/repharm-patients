import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.scss'],
})
export class AllPatientsComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.patientsService.getAllPatients().subscribe(
      (patients: Patient[]) => {
        this.patients = patients;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}

// {
//   "firstName": "John",
//   "lastName": "Doe",
//   "personalId": "120577-45544",
//   "dateOfBirth": "12.05.1977",
//   "phoneNumber": "21234567",
//   "email": "johnDoe@gmail.com",
//   "allergies": "Peanuts",
//   "immunizations": "Flu",
//   "medicalConditions": "Diabetes",
//   "medications": "string",
//   "surgergicalHistory": "Appendectomy",
//   "doctorsName": "Jane",
//   "doctorsSurname": "Brown",
//   "insurance": true
// }
