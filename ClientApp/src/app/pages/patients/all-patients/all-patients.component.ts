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
  patient?: Patient;
  head: { label: string; sortable: boolean }[] = [
    { label: 'patient', sortable: true },
    { label: 'personal id', sortable: false },
    { label: 'date of birth', sortable: true },
    { label: 'phone number', sortable: false },
    { label: 'email', sortable: true },
    { label: 'medical conditions', sortable: false },
    { label: 'surgical history', sortable: false },
    { label: 'medications', sortable: false },
    { label: 'allergies', sortable: false },
    { label: 'immunizations', sortable: false },
    { label: 'insurance', sortable: true },
    { label: 'doctor', sortable: true },
    { label: 'actions', sortable: false },
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
  searchName: string = '';

  constructor(private patientsService: PatientsService) {}

  fetchPatients(): void {
    if (this.searchName.trim() === '') {
      this.patientsService.getAllPatients().subscribe({
        next: (patients) => {
          this.patients = patients;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.patientsService.getFilteredPatients(this.searchName).subscribe({
        next: (patients) => {
          this.patients = patients;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
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
