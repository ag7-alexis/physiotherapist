import { User } from '@physiotherapist/shared';

export abstract class BaseAuthService {
  abstract validateUser(user: Partial<User>): Promise<User | null>;
}
