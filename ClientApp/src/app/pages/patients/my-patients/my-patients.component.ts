import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { PatientsService } from 'src/app/services/patients.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.scss'],
})
export class MyPatientsComponent implements OnInit {
  patients: Patient[] = [];
  doctor: string = '';
  head: string[] = [
    'patient',
    'personal id',
    'date of birth',
    'phone number',
    'email',
    'medical conditions',
    'surgical history',
    'medications',
    'allergies',
    'immunizations',
    'insurance',
  ];

  patientProperties: string[] = [
    'personalId',
    'dateOfBirth',
    'phoneNumber',
    'email',
    'medicalConditions',
    'surgicalHistory',
    'medications',
    'allergies',
    'immunizations',
  ];

  constructor(private patientsService: PatientsService, private userService: UserService) {}

  ngOnInit(): void {
    this.doctor = this.userService.user?.doctorsName + ' ' + this.userService.user?.doctorsSurname;
    this.patientsService.getDoctorsPatients(this.doctor).subscribe({
      next: (patients) => {
        this.patients = patients;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
