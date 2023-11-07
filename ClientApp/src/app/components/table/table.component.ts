import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() title?: string;
  @Input() tableDescription?: string;
  @Input() data?: Patient[];
  @Input() head?: string[];
  @Input() properties?: string[];
  @Input() isDoctorName?: boolean;
  @Input() isModalOpen: boolean = false;

  @Output() passPatient = new EventEmitter<Patient>();

  confirmDeletePatient?: Patient;

  constructor(private patientsService: PatientsService) {}

  getProperty(item: any, prop: string): any {
    return item[prop as keyof Patient];
  }

  openModal(item: Patient) {
    this.isModalOpen = true;
    this.passPatient.emit(item);
  }

  deletePatient(item: Patient) {
    this.patientsService.deletePatient(item.id).subscribe({
      next: () => {
        this.data = this.data?.filter((patient) => patient.id !== item.id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  confirmDelete() {
    if (this.confirmDeletePatient) {
      this.deletePatient(this.confirmDeletePatient);
      this.confirmDeletePatient = undefined;
    }
  }

  cancelDelete() {
    this.confirmDeletePatient = undefined;
  }

  onDeleteClick(event: Event, item: Patient) {
    event.stopPropagation();
    this.confirmDeletePatient = item;
  }
}
