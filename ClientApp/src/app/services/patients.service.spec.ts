import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PatientsService } from './patients.service';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient.model';
import { TestUtilities } from '../test/test-utils';

describe('PatientsService', () => {
  let service: PatientsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientsService],
    });

    service = TestBed.inject(PatientsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After each test, verify that there are no outstanding HTTP requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all patients from the API', () => {
    const expectedPatients: Patient[] = [TestUtilities.createMockPatient()];

    service.getAllPatients().subscribe((patients) => {
      expect(patients).toEqual(expectedPatients);
    });

    const req = httpTestingController.expectOne(environment.baseApiUrl + '/api/Patients');
    expect(req.request.method).toBe('GET');
    req.flush(expectedPatients);
  });

  it('should retrieve a doctor\'s patients from the API', () => {
    const doctor = 'Dr. Smith Smithson';
    const expectedPatients: Patient[] = [TestUtilities.createMockPatient()];

    service.getDoctorsPatients(doctor).subscribe((patients) => {
      expect(patients).toEqual(expectedPatients);
    });

    const req = httpTestingController.expectOne(environment.baseApiUrl + '/api/Patients/' + doctor);
    expect(req.request.method).toBe('GET');
    req.flush(expectedPatients);
  });

  it('should add a new patient via the API', () => {
    const newPatient: Partial<Patient> = [TestUtilities.createMockPatient()][0];
    const expectedPatient: Patient = [TestUtilities.createMockPatient()][0];

    service.addNewPatient(newPatient).subscribe((patient) => {
      expect(patient).toEqual(expectedPatient);
    });

    const req = httpTestingController.expectOne(environment.baseApiUrl + '/api/Patients');
    expect(req.request.method).toBe('POST');
    req.flush(expectedPatient);
  });

  it('should edit a patient via the API', () => {
    const patientId = '123';
    const updatedPatient: Partial<Patient> = [TestUtilities.createMockPatient()][0];
    const expectedPatient: Patient = [TestUtilities.createMockPatient()][0];

    service.editPatient(patientId, updatedPatient).subscribe((patient) => {
      expect(patient).toEqual(expectedPatient);
    });

    const req = httpTestingController.expectOne(environment.baseApiUrl + '/api/Patients/' + patientId);
    expect(req.request.method).toBe('PUT');
    req.flush(expectedPatient);
  });

  it('should delete a patient via the API', () => {
    const patientId = '123';
    const expectedPatient: Patient = [TestUtilities.createMockPatient()][0];

    service.deletePatient(patientId).subscribe((patient) => {
      expect(patient).toEqual(expectedPatient);
    });

    const req = httpTestingController.expectOne(environment.baseApiUrl + '/api/Patients/' + patientId);
    expect(req.request.method).toBe('DELETE');
    req.flush(expectedPatient);
  });
});