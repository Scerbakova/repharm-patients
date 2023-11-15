import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
})
export class MyPatientsComponent implements OnInit {
  patients: Patient[] = [];
  doctor: string = '';
  head: { label: string; sortable: boolean }[] = [
    { label: 'patient', sortable: true },
    { label: 'personal id', sortable: false },
    { label: 'date of birth', sortable: true },
    { label: 'phone number', sortable: false },
    { label: 'email', sortable: true },
    { label: 'medical conditions', sortable: false },
    { label: 'surgical history', sortable: false},
    { label: 'medications', sortable: false },
    { label: 'allergies', sortable: false },
    { label: 'immunizations', sortable: false },
    { label: 'insurance', sortable: true },
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
