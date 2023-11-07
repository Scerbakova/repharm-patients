import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.scss'],
})
export class AllPatientsComponent implements OnInit {
  patients: Patient[] = [];
  patient?: Patient
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
    'doctor',
    'actions'
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

  isModalOpen: boolean = false;

  constructor(private patientsService: PatientsService) {}

  fetchPatients(): void {
    this.patientsService.getAllPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.fetchPatients();
  }

  onEditComplete(edited: boolean) {
    if (edited) {
      this.fetchPatients();
    }
  }

  openModal(item?: Patient) {
    this.patient = item ?? undefined;
    this.isModalOpen = true;
  }
}
