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
  @Input() head?: { label: string; sortable: boolean }[];
  @Input() properties?: string[];
  @Input() isDoctorName?: boolean;
  @Input() isModalOpen: boolean = false;

  @Output() passPatient = new EventEmitter<Patient>();

  confirmDeletePatient?: Patient;

  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private patientsService: PatientsService) {}

  getProperty(item: any, prop: string): any {
    return item[prop as keyof Patient];
  }

  openModal(item: Patient) {
    this.isModalOpen = true;
    this.passPatient.emit(item);
  }

  sort(column: string) {
    const sortableColumn = this.head?.find(c => c.label === column && c.sortable);
  
    if (sortableColumn) {
      if (this.sortedColumn === sortableColumn.label) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortedColumn = sortableColumn.label;
        this.sortDirection = 'asc';
      }
  
      // Implement sorting based on the selected column and direction
      this.data = this.data?.sort((a, b) => {
        let valueA, valueB;
  
        if (sortableColumn.label === 'date of birth') {
          valueA = new Date(a.dateOfBirth).getTime();
          valueB = new Date(b.dateOfBirth).getTime();
        } else {
          valueA = this.getProperty(a, sortableColumn.label);
          valueB = this.getProperty(b, sortableColumn.label);
        }
  
        if (sortableColumn.label === 'email') {
          return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
  
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      });
  
      // Handle 'patient', 'doctor', and 'email' cases separately
      if (sortableColumn.label === 'patient' || sortableColumn.label === 'doctor') {
        this.data = this.data?.sort((a, b) => {
          const nameA = a.firstName + ' ' + a.lastName;
          const nameB = b.firstName + ' ' + b.lastName;
  
          return this.sortDirection === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
      }
    }
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
