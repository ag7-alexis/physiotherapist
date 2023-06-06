import { Model } from './model';

export interface User extends Model {
  emailAddress: string;

  password: string;
}
