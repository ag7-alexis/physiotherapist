import { Model } from '../model';

export interface File extends Model {
  path: string;
  url: string;
  category: string;
  relationUuid?: string;
}
