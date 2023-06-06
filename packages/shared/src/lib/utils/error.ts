import { present } from './helper';

export function learnToCode() {
  return new Error('Learn to Code');
}

export function illegaleState(message?: string) {
  return new Error(present(message) ? message : 'Unexpected state');
}
