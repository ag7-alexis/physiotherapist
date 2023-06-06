import { v4 as uuidV4 } from 'uuid';

export function randomString(): string {
  return Math.random().toString(36);
}

const characters = 'abcdefghijklmnopqrstuvwxyz';

export function randomWord(length = 10): string {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function randomStringList(length = 10): string[] {
  return Array.from({ length }, randomString);
}

export function randomInt(max?: number): number {
  const effectiveMax: number = undefined === max ? 100 : max;
  return Math.floor(Math.random() * Math.floor(effectiveMax));
}

export function randomDate(start?: Date, end?: Date): Date {
  const effectiveStart: Date = undefined === start ? new Date(1901, 1, 1) : start;
  const effectiveEnd: Date = undefined === end ? new Date() : end;
  const date: Date = new Date(effectiveStart.getTime() + Math.random() * (effectiveEnd.getTime() - effectiveStart.getTime()));
  return new Date(date.toUTCString());
}

export function randomUuid(): string {
  return uuidV4();
}

export function randomUuidList(length = 10): string[] {
  return Array.from({ length }, randomUuid);
}

export function randomBoolean(): boolean {
  return randomInt(100) > 50;
}

export function randomUrl(): string {
  return 'http://' + randomString() + '.bar';
}
