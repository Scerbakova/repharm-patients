import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { PatientsService } from 'src/app/services/patients.service';

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

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    const name = localStorage.getItem('name');
    const surname = localStorage.getItem('surname');
    this.doctor = name + ' ' + surname;
    this.patientsService.getDoctorsPatients(`${name}/${surname}`).subscribe({
      next: (patients) => {
        this.patients = patients;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
