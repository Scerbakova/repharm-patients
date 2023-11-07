import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RegistrationFormComponent } from './registration-form.component';
import { PatientsService } from 'src/app/services/patients.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { SimpleChange } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let patientsService: PatientsService;

  beforeEach(() => {
    patientsService = jasmine.createSpyObj('PatientsService', [
      'addNewPatient',
      'editPatient',
    ]);

    TestBed.configureTestingModule({
      declarations: [RegistrationFormComponent],
      providers: [{ provide: PatientsService, useValue: patientsService }],
      imports: [ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and title for patient registration', () => {
    component.isModalOpen = true;
    const changes: any = {
      isModalOpen: {
        currentValue: true,
        firstChange: true,
      },
    };
    component.ngOnChanges(changes);
    expect(component.formTitle).toBe('Register New Patient');
    expect(component.registerOrEdit).toBe('Register');
    expect(component.registerPatientForm.get('first name')).toBeDefined();
    expect(component.registerPatientForm.get('last name')).toBeDefined();
    expect(component.registerPatientForm.get('personal id')).toBeDefined();
    expect(component.registerPatientForm.get('date of birth')).toBeDefined();
    expect(component.registerPatientForm.get('phone number')).toBeDefined();
    expect(component.registerPatientForm.get('email')).toBeDefined();
    expect(component.registerPatientForm.get('medical conditions')).toBeDefined();
    expect(component.registerPatientForm.get('surgical history')).toBeDefined();
    expect(component.registerPatientForm.get('medications')).toBeDefined();
    expect(component.registerPatientForm.get('allergies')).toBeDefined();
    expect(component.registerPatientForm.get('immunizations')).toBeDefined();
    expect(component.registerPatientForm.get(`doctor's name`)).toBeDefined();
    expect(component.registerPatientForm.get(`doctor's surname`)).toBeDefined();
    expect(component.registerPatientForm.get('insurance')).toBeDefined();
  });

  it('should initialize the form and title for editing a patient', () => {
    // Simulate opening the modal for editing a patient
    component.isModalOpen = true;
  
    // Create a sample patient for editing
    const samplePatient: Partial<Patient> = {
      firstName: 'John',
      lastName: 'Doe',
      personalId: '12345',
      dateOfBirth: '1990-01-01',
      phoneNumber: '555-123-4567',
      email: 'john.doe@example.com',
      medicalConditions: ['Hypertension', 'Diabetes'],
      surgicalHistory: [],
      medications: ['Medication A'],
      allergies: ['Peanuts'],
      immunizations: ['Flu Shot'],
      doctorsName: 'Dr. Smith',
      doctorsSurname: 'Smithson',
      insurance: true,
    };
  
    component.patient = samplePatient;

    const changes: any = {
      isModalOpen: {
        currentValue: true,
        firstChange: true,
      },
    };
  
    component.ngOnChanges(changes);

    expect(component.formTitle).toBe("Change Patient's data");
    expect(component.registerOrEdit).toBe('Edit');

    expect(component.registerPatientForm.get('first name')?.value).toBe('John');
    expect(component.registerPatientForm.get('last name')?.value).toBe('Doe');
    expect(component.registerPatientForm.get('personal id')?.value).toBe('12345');
    expect(component.registerPatientForm.get('date of birth')?.value).toBe('1990-01-01');
    expect(component.registerPatientForm.get('phone number')?.value).toBe('555-123-4567');
    expect(component.registerPatientForm.get('email')?.value).toBe('john.doe@example.com');
    expect(component.registerPatientForm.get('medical conditions')?.value).toEqual(['Hypertension', 'Diabetes']);
    expect(component.registerPatientForm.get('surgical history')?.value).toEqual([]);
    expect(component.registerPatientForm.get('medications')?.value).toEqual(['Medication A']);
    expect(component.registerPatientForm.get('allergies')?.value).toEqual(['Peanuts']);
    expect(component.registerPatientForm.get('immunizations')?.value).toEqual(['Flu Shot']);
    expect(component.registerPatientForm.get(`doctor's name`)?.value).toBe('Dr. Smith');
    expect(component.registerPatientForm.get(`doctor's surname`)?.value).toBe('Smithson');
    expect(component.registerPatientForm.get('insurance')?.value).toBe(true);
  });
});