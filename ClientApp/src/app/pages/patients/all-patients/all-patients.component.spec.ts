import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllPatientsComponent } from './all-patients.component';
import { PatientsService } from 'src/app/services/patients.service';
import { throwError, of } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestUtilities } from 'src/app/test/test-utils';

describe('AllPatientsComponent', () => {
  let component: AllPatientsComponent;
  let fixture: ComponentFixture<AllPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllPatientsComponent],
      providers: [PatientsService],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AllPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch patients on ngOnInit', () => {
    const patientsService = TestBed.inject(PatientsService);
    const patients: Patient[] = [TestUtilities.createMockPatient()];

    spyOn(patientsService, 'getAllPatients').and.returnValue(of(patients));

    component.ngOnInit();

    expect(component.patients).toEqual(patients);
  });

  it('should handle errors during data fetch', () => {
    const patientsService = TestBed.inject(PatientsService);

    spyOn(patientsService, 'getAllPatients').and.returnValue(
      throwError('Error message')
    );

    component.ngOnInit();

    expect(component.patients).toEqual([]);
  });

  it('should refresh patients when an edit operation is completed', () => {
    const patientsService = TestBed.inject(PatientsService);
    const patients: Patient[] = [TestUtilities.createMockPatient()];;

    spyOn(patientsService, 'getAllPatients').and.returnValue(of(patients));

    component.onEditComplete(true);

    expect(component.patients).toEqual(patients);
  });

  it('should open the modal for adding or editing patients', () => {
    const patientToEdit: Patient = [TestUtilities.createMockPatient()][0]

    component.openModal(patientToEdit);

    expect(component.patient).toEqual(patientToEdit);
    expect(component.isModalOpen).toBe(true);
  });
});