import { File } from './file.model';
import { Meeting } from './meeting.model';
import { Model } from './model';
import { Patient } from './patient.model';

export interface MedicalPrescription extends Model {
  prescribingDoctor: string;
  prescriptionDate: Date;
  totalExpectedMeetings: number;

  pathology: string;

  commentary: string | undefined;

  patientUuid: string;
  patient: Patient;

  meetings: Meeting[];

  prescriptionPictureFileUuid: string | undefined;
  prescriptionPictureFile: File | undefined;
}
