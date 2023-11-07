import { Patient } from 'src/app/models/patient.model';

export class TestUtilities {
  static createMockPatient(): Patient {
    return {
      id: '123',
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
  }
}