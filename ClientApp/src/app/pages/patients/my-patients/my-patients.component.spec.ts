import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPatientsComponent } from './my-patients.component';
import { PatientsService } from 'src/app/services/patients.service';
import { throwError, of } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestUtilities } from 'src/app/test/test-utils';

describe('MyPatientsComponent', () => {
  let component: MyPatientsComponent;
  let fixture: ComponentFixture<MyPatientsComponent>;

  beforeEach(async () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'name') return 'Dr. Smith';
      if (key === 'surname') return 'Smithson';
      return null;
    });
    await TestBed.configureTestingModule({
      declarations: [MyPatientsComponent],
      providers: [PatientsService],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MyPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize doctor and patients on ngOnInit', () => {
    const patientsService = TestBed.inject(PatientsService);
    const patients: Patient[] = [TestUtilities.createMockPatient()];

    spyOn(patientsService, 'getDoctorsPatients').and.returnValue(of(patients));

    component.ngOnInit();

    expect(component.doctor).toBe('Dr. Smith Smithson');
    expect(component.patients).toEqual(patients);
  });

  it('should handle errors during data fetch', () => {
    const patientsService = TestBed.inject(PatientsService);

    spyOn(patientsService, 'getDoctorsPatients').and.returnValue(
      throwError('Error message')
    );

    component.ngOnInit();

    expect(component.doctor).toBe('Dr. Smith Smithson');
    expect(component.patients).toEqual([]);
  });
});
