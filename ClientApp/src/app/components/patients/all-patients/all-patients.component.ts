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
    this.patientsService.getAllPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
