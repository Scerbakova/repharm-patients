import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';

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

  getProperty(item: any, prop: string): any {
    return item[prop as keyof Patient];
  }

  openModal(item: Patient) {
    this.isModalOpen = true;
    this.passPatient.emit(item);
  }
}
