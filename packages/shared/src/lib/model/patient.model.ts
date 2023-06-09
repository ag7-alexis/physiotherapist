import { File } from './file.model';
import { MedicalPrescription } from './medical-prescription.model';
import { Model } from './model';

export interface Patient extends Model {
  socialsecurityNumber: string;

  firstname: string;
  lastname: string;
  emailAddress: string;
  phoneNumber: string;

  streetlineAddress: string;
  cityAddress: string;
  zipcodeAddress: string;
  latAddress: number;
  lonAddress: number;

  medicalPrescriptions: MedicalPrescription[];

  pictureFileUuid: string | undefined;
  pictureFile: File | undefined;
}
