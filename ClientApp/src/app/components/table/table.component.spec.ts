import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { PatientsService } from 'src/app/services/patients.service';
import { of, throwError } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestUtilities } from 'src/app/test/test-utils';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let patientsService: PatientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [PatientsService],
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    patientsService = TestBed.inject(PatientsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a confirmation modal when onDeleteClick is called', () => {
    const item: Patient = [TestUtilities.createMockPatient()][0];
    const event: any = {
      stopPropagation: () => {},
    };
    spyOn(event, 'stopPropagation');
    component.onDeleteClick(event, item);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.confirmDeletePatient).toEqual(item);
  });

  it('should delete a patient and update the data when deletePatient is called', () => {
    const item: Patient = [TestUtilities.createMockPatient()][0];
    const patients: Patient[] = [item];
    component.data = patients;
    spyOn(patientsService, 'deletePatient').and.returnValue(of(item));
    component.deletePatient(item);
    expect(component.data).not.toContain(item);
  });

  it('should handle errors when deletePatient encounters an error', () => {
    const item: Patient = [TestUtilities.createMockPatient()][0];
    spyOn(patientsService, 'deletePatient').and.returnValue(
      throwError('Error')
    );
    spyOn(console, 'log');
    component.deletePatient(item);
    expect(console.log).toHaveBeenCalledWith('Error');
  });

  it('should confirm delete and clear confirmDeletePatient when confirmDelete is called', () => {
    const item: Patient = [TestUtilities.createMockPatient()][0];
    component.confirmDeletePatient = item;
    spyOn(component, 'deletePatient');
    component.confirmDelete();
    expect(component.deletePatient).toHaveBeenCalledWith(item);
    expect(component.confirmDeletePatient).toBeUndefined();
  });

  it('should clear confirmDeletePatient when cancelDelete is called', () => {
    const item: Patient = [TestUtilities.createMockPatient()][0];
    component.confirmDeletePatient = item;
    component.cancelDelete();
    expect(component.confirmDeletePatient).toBeUndefined();
  });
});
