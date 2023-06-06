import { Model } from './model';
import { Practitioner } from './practitioner.model';

export interface MedicalProcedure extends Model {
  title: string;
  designation: string;

  price: number;
  durationInMinutes: number;

  practitionerUuid: string;
  practitioner: Practitioner;
}
