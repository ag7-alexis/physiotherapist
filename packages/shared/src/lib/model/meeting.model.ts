import { MedicalPrescription } from './medical-prescription.model';
import { MedicalProcedure } from './medical-procedure.model';
import { Model } from './model';
import { Patient } from './patient.model';
import { Practitioner } from './practitioner.model';

export interface Meeting extends Model {
  status: 'waiting' | 'ongoing' | 'finished' | 'cancel';
  isDateFixed: boolean;
  chargedPrice: number | undefined;
  expectedStartDate: Date;
  startDate: Date | undefined;
  expectedEndDate: Date;
  endDate: Date | undefined;
  commentary: string | undefined;

  patientUuid: string;
  patient: Patient;

  practitionerUuid: string;
  practitioner: Practitioner;

  medicalPrescriptionUuid: string;
  medicalPrescription: MedicalPrescription;

  medicalProcedureUuid: string;
  medicalProcedure: MedicalProcedure;
}
