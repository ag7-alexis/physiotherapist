import { File } from './file.model';
import { MedicalProcedure } from './medical-procedure.model';
import { Model } from './model';
import { User } from './user.model';

export interface Practitioner extends Model {
  firstname: string;
  lastname: string;
  emailAddress: string;
  phoneNumber: string;
  speciality: string;

  streetlineAddress: string;
  cityAddress: string;
  zipcodeAddress: string;
  latAddress: number;
  lonAddress: number;

  userUuid: string;
  user: User;

  medialProdecudes: MedicalProcedure[];
  pictureFileUuid: string | undefined;
  pictureFile: File | undefined;
}
