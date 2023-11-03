import { Component, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() title?: string;
  @Input() tableDescription?: string;
  @Input() data?: Patient[];
  @Input() head?: string[];
  @Input() properties?: string[];
  @Input() doctorName?: boolean;

  getProperty(item: any, prop: string): any {
    return item[prop as keyof Patient];
  }
}