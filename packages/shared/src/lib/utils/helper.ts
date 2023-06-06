import moment from 'moment';
import { NumberKey } from './typing';

export function absent(obj: unknown): obj is undefined | null {
  return obj === undefined || obj === null;
}

export function present<T>(obj: T | undefined | null): obj is T {
  return obj !== undefined && obj !== null;
}

export function optionalTrim(text: string | undefined | null): string | undefined {
  if (absent(text)) {
    return undefined;
  }
  const textTrimed: string = text.trim();
  return textTrimed.length === 0 ? undefined : textTrimed;
}

export function emptyString(text: string | undefined | null): boolean {
  const x: string | undefined = optionalTrim(text);
  return absent(x);
}

export function presentString(text: string | undefined | null): text is string {
  const x: string | undefined = optionalTrim(text);
  return present(x);
}

export function absentString(text: string | undefined | null): text is undefined | null {
  const x: string | undefined = optionalTrim(text);
  return absent(x);
}

export function presentArray(array: unknown | undefined | null): array is Array<unknown> {
  return Array.isArray(array) && array.length > 0;
}

export function absentArray(array: unknown | undefined | null): array is undefined | null {
  return !Array.isArray(array) || (Array.isArray(array) && array.length === 0);
}

export function isNumber(obj: number | unknown): obj is number {
  return typeof obj === 'number';
}

export function isBoolean(obj: boolean | unknown): obj is boolean {
  return typeof obj === 'boolean';
}

export function isString(obj: string | unknown): obj is string {
  return typeof obj === 'string';
}

export function isArray(array: unknown | undefined | null): array is Array<unknown> {
  return Array.isArray(array);
}

export function parseBoolean(input: number | string | boolean | null | undefined): boolean | undefined {
  if (absent(input)) {
    return undefined;
  }
  if (isBoolean(input)) {
    return input;
  }
  if (isString(input) && emptyString(input)) {
    return undefined;
  }
  return !!input && input !== 'false' && input !== 'FALSE' && input !== 'f' && input !== 'F' && input !== '0' && input !== 0;
}

export function parseInt2(inputInteger: number | string | null | undefined): number | undefined {
  let parsedInteger: number | undefined;
  if (inputInteger === null || inputInteger === undefined || isNaN(inputInteger as number)) {
    return parsedInteger;
  }
  if (isNumber(inputInteger)) {
    return inputInteger as number;
  }
  const x = parseInt(inputInteger as string, 10);
  const isNumberToto = !isNaN(x);
  if (isNumberToto) {
    parsedInteger = x;
  } else {
    if (typeof inputInteger === 'string' && absentString(inputInteger)) {
      return undefined;
    }
    throw new Error('Unexpected <~inputInteger: ' + inputInteger + ' ~>');
  }
  return parsedInteger;
}

export function parseNumber(input: number | string | boolean | null | undefined): number | undefined {
  let parsed: number | undefined;
  if (absent(input)) {
    return parsed;
  }
  if (isNumber(input)) {
    return input as number;
  }
  if (isBoolean(input)) {
    return Number(input);
  }
  if (isString(input) && emptyString(input)) {
    return parsed;
  }
  const num = Number(input);
  const validNumber = !isNaN(num) && isFinite(num);
  if (validNumber) {
    parsed = num;
  } else {
    throw new Error('Unexpected <~input: ' + input + ' ~>');
  }
  return parsed;
}

export function isEmptyArray(obj: unknown[] | unknown): boolean {
  if (typeof obj === 'string') {
    return false;
  }
  return absent(obj) || (Array.isArray(obj) && obj.length === 0);
}

export function isFilledArray<T = unknown>(obj: T[] | T): obj is T[] {
  if (typeof obj === 'string') {
    return false;
  }
  return present(obj) && Array.isArray(obj) && obj.length > 0;
}

type unknowDate = unknown | undefined | null | 'yesterday' | 'tomorrow' | 'last-month';
export function fromUnknownToDate(entry: unknowDate): Date | undefined {
  if (absent(entry)) {
    return undefined;
  }
  let date: Date | undefined;
  if (entry instanceof Date) {
    date = entry;
  } else if (typeof entry === 'string') {
    if (absentString(entry)) {
      return undefined;
    }
    if (entry === 'today') {
      return new Date();
    }
    if (entry === 'yesterday' || entry === 'tomorrow') {
      const date = new Date();
      date.setDate(date.getDate() + { yesterday: -1, tomorrow: 1 }[entry]);
      return date;
    }
    if (entry === 'last-month') {
      const date = new Date();
      date.setDate(date.getDate() - 30);
      return date;
    }
    const isDateString = entry.match(/[a-zA-Z\:\-]/);
    if (isDateString) {
      date = new Date(entry);
    } else {
      const entryNumber = parseFloat2(entry);
      return fromUnknownToDate(entryNumber);
    }
  } else if (typeof entry === 'number') {
    const isUnixTimestamp = moment.unix(entry * 1000).isValid();
    if (isUnixTimestamp) {
      date = new Date(entry * 1000);
    } else {
      date = new Date(entry);
    }
  }
  return absent(date) || 'Invalid Date' === date.toString() ? undefined : date;
}

export function parseFloat2(inputFloat: number | string | null | undefined): number | undefined {
  let parsedFloat: number | undefined;
  if (inputFloat === null || inputFloat === undefined) {
    return parsedFloat;
  }
  if (isNumber(inputFloat)) {
    return inputFloat as number;
  }

  const x = parseFloat(inputFloat as string);
  const isNumberToto = !isNaN(x);
  if (isNumberToto) {
    parsedFloat = x;
  } else {
    throw new Error('Unexpected <~inputInteger: ' + inputFloat + ' ~>');
  }
  return parsedFloat;
}

export function coerceString(value: string | undefined | null): string {
  return absent(value) ? '' : value.trim();
}

export function deepEqual(x: unknown, y: unknown): boolean {
  return internalDeepEqual(x, y);
}

function internalDeepEqual(x: unknown, y: unknown): boolean {
  if (x === y) {
    return true;
  } else if (typeof x === 'object' && x != null && typeof y === 'object' && y != null) {
    if (Object.keys(x).length !== Object.keys(y).length) return false;

    for (const prop in x) {
      if (prop in y) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!internalDeepEqual((x as any)[prop], (y as any)[prop])) return false;
      } else {
        return false;
      }
    }

    return true;
  } else {
    return false;
  }
}

export function toCamelCase(str: string) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export function formatDate(date: Date) {
  let day, month, year;

  day = date.getDate();
  month = date.getMonth() + 1;
  year = date.getFullYear();

  day = day.toString().padStart(2, '0');

  month = month.toString().padStart(2, '0');

  return [day, month, year];
}

export function arrayMove(arr: unknown[], fromIndex: number, toIndex: number) {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
  return arr;
}

export function clone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x));
}

export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getDateRange(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  let curr = new Date(end);

  while (curr > new Date(start)) {
    const d = new Date(curr);
    dates.push(d);
    curr.setDate(curr.getDate() - 1);
  }
  return dates;
}

function hasOwnProperty<X extends Record<string, unknown>, Y extends keyof X>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}

export function replacementValue<X extends Partial<X>, K extends keyof X>(values: X, self: X, prop: K): (X & Record<K, unknown>)[K] {
  return hasOwnProperty(values, prop) ? values[prop] : self[prop];
}

export function percentage(x: number, y: number) {
  return 100 / (y / x);
}

export function uniqArray<T extends string | number>(array: T[]) {
  const seen: any = {};
  const out: Array<T> = [];
  const len = array.length;
  let j = 0;
  for (let i = 0; i < len; i++) {
    const item = array[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}
export function getDateByNumberOfDaysWasAgo(number: number) {
  const d = new Date();
  d.setDate(new Date().getDate() - number);
  return d;
}

export function encodeBase64(data: any) {
  return btoa(JSON.stringify(data));
}

export function decodeBase64(base64: string) {
  return JSON.parse(atob(base64));
}

export function isRecord(a: any): a is Record<any, any> {
  return typeof a === 'object' && !isArray(a);
}

export function hasLength(val: any): boolean {
  return val.length > 0;
}
export function isArrayFull(val: any): boolean {
  return Array.isArray(val) && hasLength(val);
}

export function toFormData(object: any) {
  const body = new FormData();
  for (let [key, val] of Object.entries(object)) {
    body.append(key, JSON.stringify(val));
  }
  return body;
}

export function getTotal<T extends Array<X>, X>(values: T, target: NumberKey<X>) {
  return values.reduce((p, c) => p + ((c[target] as number) ?? 0), 0);
}

export function getAverage<T extends Array<X>, X>(values: T, target: NumberKey<X>) {
  const total = getTotal(values, target);
  if (values.length === 0) {
    return [0, total, values.length];
  }
  return [getTotal(values, target) / values.length, total, values.length];
}

export function lessThanXHourAgo(date: Date, hours = 1): boolean {
  return moment(date).isAfter(moment().subtract(hours, 'hours'));
}

export function previousXDays(date: Date, days = 1): Date {
  return moment(date).subtract(days, 'days').toDate();
}

export function generateRandomString(length: number = 4): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
