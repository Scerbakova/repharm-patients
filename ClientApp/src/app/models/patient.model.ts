export type PatientFieldWithNoneOrMultipleValues = string[] | string | null;
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  personalId: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  medicalConditions: PatientFieldWithNoneOrMultipleValues;
  surgicalHistory: PatientFieldWithNoneOrMultipleValues;
  medications: PatientFieldWithNoneOrMultipleValues;
  allergies: PatientFieldWithNoneOrMultipleValues;
  immunizations: PatientFieldWithNoneOrMultipleValues;
  doctorsName: string;
  doctorsSurname: string;
  insurance: boolean;
}
