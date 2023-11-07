import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Patient } from 'src/app/models/patient.model';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  @Input() isModalOpen: boolean = false;
  @Input() patient?: Partial<Patient>;
  @Output() isModalOpenChange = new EventEmitter<boolean>();
  @Output() patientEdited = new EventEmitter<boolean>();

  registerPatientForm: FormGroup = this.fb.group({});
  registerOrEdit: 'Register' | 'Edit' = 'Register';
  formTitle: string = '';

  personalIdValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const personalId = control.value;
      if (!personalId) {
        return null;
      }

      const regex = /^\d{6}-\d{5}$/;
      if (!regex.test(personalId)) {
        return { invalidPersonalId: true };
      }

      return null;
    };
  }

  buidForm(): void {
    this.registerPatientForm = this.fb.group({
      'first name': ['', Validators.required],
      'last name': ['', Validators.required],
      'personal id': ['', [Validators.required, this.personalIdValidator()]],
      'date of birth': [
        '',
        [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
      ],
      'phone number': ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      'medical conditions': [''],
      'surgical history': [''],
      medications: [''],
      allergies: [''],
      immunizations: [''],
      "doctor's name": ['', Validators.required],
      "doctor's surname": ['', Validators.required],
      insurance: [false],
    });
  }
  populateForm(): void {
    if (this.patient) {
      this.registerPatientForm.patchValue({
        'first name': this.patient.firstName,
        'last name': this.patient.lastName,
        'personal id': this.patient.personalId,
        'date of birth': this.patient.dateOfBirth,
        'phone number': this.patient.phoneNumber,
        email: this.patient.email,
        'medical conditions': this.patient.medicalConditions,
        'surgical history': this.patient.surgicalHistory,
        medications: this.patient.medications,
        allergies: this.patient.allergies,
        immunizations: this.patient.immunizations,
        "doctor's name": this.patient.doctorsName,
        "doctor's surname": this.patient.doctorsSurname,
        insurance: this.patient.insurance,
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isModalOpen && this.isModalOpen) {
      if (this.patient) {
        this.populateForm();
        this.registerOrEdit = 'Edit';
        this.formTitle = "Change Patient's data";
      } else {
        this.registerOrEdit = 'Register';
        this.formTitle = 'Register New Patient';
        this.buidForm();
      }
    }
  }

  ngOnInit(): void {
    this.buidForm();
  }

  patientFields: string[] = [
    'first name',
    'last name',
    'personal id',
    'phone number',
    'email',
    'medical conditions',
    'surgical history',
    'medications',
    'allergies',
    'immunizations',
    `doctor's name`,
    `doctor's surname`,
  ];

  close() {
    this.resetForm();
    this.isModalOpenChange.emit(false);
  }

  preventClose(event: Event) {
    event.stopPropagation();
  }

  private resetForm() {
    this.registerPatientForm.reset();
  }

  constructor(
    private patientsService: PatientsService,
    private fb: FormBuilder
  ) {}

  registerPatient() {
    const patient: Partial<Patient> = {
      firstName: this.registerPatientForm.get('first name')?.value,
      lastName: this.registerPatientForm.get('last name')?.value,
      personalId: this.registerPatientForm.get('personal id')?.value,
      dateOfBirth: this.registerPatientForm.get('date of birth')?.value,
      phoneNumber: this.registerPatientForm.get('phone number')?.value,
      email: this.registerPatientForm.get('email')?.value,
      medicalConditions:
        this.registerPatientForm.get('medical conditions')?.value,
      surgicalHistory: this.registerPatientForm.get('surgical history')?.value,
      medications: this.registerPatientForm.get('medications')?.value,
      allergies: this.registerPatientForm.get('allergies')?.value,
      immunizations: this.registerPatientForm.get('immunizations')?.value,
      doctorsName: this.registerPatientForm.get(`doctor's name`)?.value,
      doctorsSurname: this.registerPatientForm.get(`doctor's surname`)?.value,
      insurance: this.registerPatientForm.get('insurance')?.value,
    };
    if (this.registerPatientForm.valid) {
      if (this.registerOrEdit === 'Register') {
        this.patientsService.addNewPatient(patient).subscribe({
          next: () => {
            this.patientEdited.emit(true);
            this.resetForm();
            this.close();
          },
          error: (error) => {
            console.error('Error registering patient:', error);
          },
        });
      } else if (this.registerOrEdit === 'Edit') {
        patient.id = this.patient?.id;
        this.patientsService.editPatient(patient.id, patient).subscribe({
          next: () => {
            this.patientEdited.emit(true);
            this.resetForm();
            this.patient = undefined;
            this.close();
          },
          error: (error) => {
            console.error('Error editing patient:', error);
          },
        });
      }
    } else {
      alert('Please fill in all the required fields.');
    }
  }
}
