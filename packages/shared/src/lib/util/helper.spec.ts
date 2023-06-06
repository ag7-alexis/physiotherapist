import { randomString } from '../testing';
import {
  absent,
  absentArray,
  deepEqual,
  emptyString,
  fromUnknownToDate,
  isBoolean,
  isEmptyArray,
  isFilledArray,
  isNumber,
  optionalTrim,
  parseBoolean,
  parseFloat2,
  parseNumber,
  present,
  presentArray,
  presentString,
  smpParseInt,
} from './helper';

describe('SmpLangUtils', () => {
  describe('deepEqual', () => {
    it('Should return expected value', () => {
      const a = { panda: 'test', koala: 'test' };
      const b = { panda: 'test', koala: 'test' };
      const c = { panda: 2, koala: 'test' };
      const d = { panda: 'test' };
      const e = { panda: 0 };
      const f = { panda: null };
      const g = { panda: false };
      const h = { panda: false };
      const i = { panda: { test: true } };
      const j = { panda: { test: true } };
      const k = { panda: { test: false } };
      const l = { panda: { test: true, foo: 'bar' } };

      expect(deepEqual(a, b)).toBe(true);
      expect(deepEqual(b, a)).toBe(true);
      expect(deepEqual(a, c)).toBe(false);
      expect(deepEqual(c, a)).toBe(false);
      expect(deepEqual(b, c)).toBe(false);
      expect(deepEqual(c, b)).toBe(false);
      expect(deepEqual(a, d)).toBe(false);
      expect(deepEqual(d, a)).toBe(false);
      expect(deepEqual(b, d)).toBe(false);
      expect(deepEqual(d, b)).toBe(false);
      expect(deepEqual(c, d)).toBe(false);
      expect(deepEqual(d, c)).toBe(false);
      expect(deepEqual(f, g)).toBe(false);
      expect(deepEqual(g, f)).toBe(false);
      expect(deepEqual(g, h)).toBe(true);
      expect(deepEqual(e, g)).toBe(false);
      expect(deepEqual(g, e)).toBe(false);
      expect(deepEqual(i, j)).toBe(true);
      expect(deepEqual(j, k)).toBe(false);
      expect(deepEqual(k, l)).toBe(false);
      expect(deepEqual(i, k)).toBe(false);
    });
  });

  describe('absent', () => {
    it('GIVEN undefined THEN value must be false boolean', () => {
      const value = undefined;

      const result: boolean = absent(value);

      expect(result).toBe(true);
    });

    it('GIVEN null THEN value must be true boolean', () => {
      const value = null;

      const result: boolean = absent(value);

      expect(result).toBe(true);
    });

    it('GIVEN anything THEN value must be false boolean', () => {
      const value: unknown = {};

      const result: boolean = absent(value);

      expect(result).toBe(false);
    });
  });

  describe('present', () => {
    it('GIVEN anything THEN should be true', () => {
      const value: unknown = { foo: 'bar' };

      const result: boolean = present(value);

      expect(result).toBe(true);
    });

    it('GIVEN anything empty THEN should return false', () => {
      const value: unknown = {};

      const result: boolean = present(value);

      expect(result).toBe(true);
    });

    it('GIVEN undefined THEN should return false', () => {
      const value = undefined;

      const result: boolean = present(value);

      expect(result).toBe(false);
    });
  });

  describe('optionalTrim', () => {
    it('GIVEN empty string THEN value must be "" ', () => {
      const value = '';

      const result: string | undefined = optionalTrim(value);

      expect(result).toBeUndefined();
    });

    it('GIVEN empty string THEN value must be "" ', () => {
      const value = '  ';

      const result: string | undefined = optionalTrim(value);

      expect(result).toBeUndefined();
    });

    it('GIVEN filled string THEN value must be "a a" ', () => {
      const value = ' a a  ';

      const result: string | undefined = optionalTrim(value);

      expect(result).toBe('a a');
    });
  });

  describe('emptyString', () => {
    it('GIVEN empty string THEN value must be true boolean', () => {
      const value = '';

      const result: boolean = emptyString(value);

      expect(result).toBe(true);
    });

    it('GIVEN empty string THEN value must be true boolean', () => {
      const value = '  ';

      const result: boolean = emptyString(value);

      expect(result).toBe(true);
    });

    it('GIVEN not empty string THEN value must be false boolean', () => {
      const value = 'not empty';

      const result: boolean = emptyString(value);

      expect(result).toBe(false);
    });
  });

  describe('presentString', () => {
    it('GIVEN empty string THEN value must be true boolean', () => {
      const value = '';

      const result: boolean = presentString(value);

      expect(result).toBe(false);
    });

    it('GIVEN empty string THEN value must be true boolean', () => {
      const value = '  ';

      const result: boolean = presentString(value);

      expect(result).toBe(false);
    });

    it('GIVEN not empty string THEN value must be false boolean', () => {
      const value = 'not empty';

      const result: boolean = presentString(value);

      expect(result).toBe(true);
    });
  });

  describe('presentArray', () => {
    it('GIVEN undefined THEN value must be false boolean', () => {
      const result: boolean = presentArray(undefined);

      expect(result).toBe(false);
    });

    it('GIVEN null THEN value must be false boolean', () => {
      const result: boolean = presentArray(null);

      expect(result).toBe(false);
    });

    it('GIVEN empty array THEN value must be false boolean', () => {
      const result: boolean = presentArray([]);

      expect(result).toBe(false);
    });

    it('GIVEN object THEN value must be false boolean', () => {
      const result: boolean = presentArray({});

      expect(result).toBe(false);
    });

    it('GIVEN not empty array THEN value must be true boolean', () => {
      const result: boolean = presentArray([1, 2, 3]);

      expect(result).toBe(true);
    });
  });

  describe('absentArray', () => {
    it('GIVEN undefined THEN value must be true boolean', () => {
      const result: boolean = absentArray(undefined);

      expect(result).toBe(true);
    });

    it('GIVEN null THEN value must be true boolean', () => {
      const result: boolean = absentArray(null);

      expect(result).toBe(true);
    });

    it('GIVEN empty array THEN value must be true boolean', () => {
      const result: boolean = absentArray([]);

      expect(result).toBe(true);
    });

    it('GIVEN object THEN value must be true boolean', () => {
      const result: boolean = absentArray({});

      expect(result).toBe(true);
    });

    it('GIVEN not empty array THEN value must be false boolean', () => {
      const result: boolean = absentArray(['1', '2', '3']);

      expect(result).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('GIVEN anything but number THEN return false', () => {
      const value: unknown = 'test';

      const result = isNumber(value);

      expect(result).toBe(false);
    });

    it('GIVEN string THEN return true', () => {
      const value: unknown = 42;

      const result = isNumber(value);

      expect(result).toBe(true);
    });
  });

  describe('isBoolean', () => {
    it('GIVEN anything but boolean THEN return false', () => {
      const value: unknown = 'test';

      const result = isBoolean(value);

      expect(result).toBe(false);
    });

    it('GIVEN boolean THEN return true', () => {
      const value: unknown = false;

      const result = isBoolean(value);

      expect(result).toBe(true);
    });
  });

  describe('smpParseInt', () => {
    it('GIVEN undefined', () => {
      const actual = smpParseInt(undefined);

      expect(actual).toBe(undefined);
    });

    it('GIVEN null', () => {
      const actual = smpParseInt(null);

      expect(actual).toBe(undefined);
    });

    it('GIVEN "20"', () => {
      const actual = smpParseInt('20');

      expect(actual).toEqual(20);
    });
  });

  describe('isEmptyArray', () => {
    it('GIVEN empty array THEN should return true', () => {
      const value: unknown[] = [];

      const result: boolean = isEmptyArray(value);

      expect(result).toBe(true);
    });

    it('GIVEN non empty array THEN should return false', () => {
      const value: unknown[] = ['test'];

      const result: boolean = isEmptyArray(value);

      expect(result).toBe(false);
    });

    it('GIVEN not array THEN should return false', () => {
      const value: unknown = 'test';

      const result: boolean = isEmptyArray(value);

      expect(result).toBe(false);
    });
  });

  describe('isFilledArray', () => {
    it('GIVEN empty array THEN should return false', () => {
      const value: unknown[] = [];

      const result: boolean = isFilledArray(value);

      expect(result).toBe(false);
    });

    it('GIVEN filled array THEN should return true', () => {
      const value: unknown[] = ['foo'];

      const result: boolean = isFilledArray(value);

      expect(result).toBe(true);
    });

    it('GIVEN filled string THEN should return false', () => {
      const value: unknown = 'toto';

      const result: boolean = isFilledArray(value);

      expect(result).toBe(false);
    });

    it('GIVEN empty string THEN should return false', () => {
      const value: unknown = '';

      const result: boolean = isFilledArray(value);

      expect(result).toBe(false);
    });
  });

  describe('fromStringfromUnknownToDate', () => {
    it('GIVEN undefined THEN should return undefined', () => {
      const actual: Date | undefined = fromUnknownToDate(undefined);

      expect(actual).toBe(undefined);
    });

    it('GIVEN null THEN should return undefined', () => {
      const actual: Date | undefined = fromUnknownToDate(null);

      expect(actual).toBe(undefined);
    });

    it('GIVEN Date THEN should return Date', () => {
      const value: unknown = new Date();
      const expected: unknown = value;

      const actual: Date | undefined = fromUnknownToDate(value);

      expect(actual).toBe(expected);
    });

    it('GIVEN string timestamp THEN should return Date', () => {
      const now = new Date();
      const value: unknown = now.getTime().toString();
      const expected: unknown = now;

      const actual: Date | undefined = fromUnknownToDate(value);

      expect(actual).toEqual(expected);
    });

    it('GIVEN number timestamp THEN should return Date', () => {
      const now = new Date();
      const value: unknown = now.getTime();
      const expected: unknown = now;

      const actual: Date | undefined = fromUnknownToDate(value);

      expect(actual).toEqual(expected);
    });

    it('GIVEN number timestamp in seconds THEN should return Date', () => {
      const now = new Date();
      const value: unknown = ~~(now.getTime() / 1000);
      now.setMilliseconds(0);
      const expected: unknown = now;

      const actual: Date | undefined = fromUnknownToDate(value);

      expect(actual).toEqual(expected);
    });

    it('GIVEN string timestamp in seconds THEN should return Date', () => {
      const now = new Date();
      const value: unknown = (~~(now.getTime() / 1000)).toString();
      now.setMilliseconds(0);
      const expected: unknown = now;

      const actual: Date | undefined = fromUnknownToDate(value);

      expect(actual).toEqual(expected);
    });

    it('GIVEN string unixtimestamp THEN should return Date', () => {
      const now = new Date();
      const value: unknown = (now.getTime() / 1000).toString();
      const expected: unknown = now;

      const actual: Date | undefined = fromUnknownToDate(value);

      expect(actual).toEqual(expected);
    });

    it('GIVEN number unixtimestamp THEN should return Date', () => {
      const now = new Date();
      const value: unknown = now.getTime() / 1000;
      const expected: unknown = now;

      const actual: Date | undefined = fromUnknownToDate(value);

      expect(actual).toEqual(expected);
    });

    it('WHEN date string THEN returns new date instance', () => {
      const value = '2020-01-01T10:00:00Z';
      const expected: Date = new Date(value);

      const actual: Date | undefined = fromUnknownToDate(value);

      expect(actual).toEqual(expected);
    });

    it('GIVEN string THEN should return Date', () => {
      const value = '2020-01-01T10:00:00.000Z';
      const expected: unknown = new Date(value);

      const actual: Date | undefined = fromUnknownToDate(value);

      expect(actual).toEqual(expected);
    });

    it('GIVEN string THEN should return Date', () => {
      const value = '1647353494.64769';
      const expected: unknown = new Date('2022-03-15T14:11:34.647Z');

      const actual: Date | undefined = fromUnknownToDate(value);

      expect(actual).toEqual(expected);
    });
  });

  describe('parseFloat2', () => {
    it('GIVEN undefined', () => {
      const actual = parseFloat2(undefined);

      expect(actual).toBe(undefined);
    });

    it('GIVEN null', () => {
      const actual = parseFloat2(undefined);

      expect(actual).toBe(undefined);
    });

    it('GIVEN "20"', () => {
      const actual = parseFloat2('20');

      expect(actual).toEqual(20);
    });

    it('GIVEN "20.65"', () => {
      const actual = parseFloat2('20.65');

      expect(actual).toEqual(20.65);
    });
  });

  describe('parseNumber', () => {
    it('GIVEN undefined', () => {
      const actual = parseNumber(undefined);

      expect(actual).toBe(undefined);
    });

    it('GIVEN null', () => {
      const actual = parseNumber(null);

      expect(actual).toBe(undefined);
    });

    it('GIVEN "  "', () => {
      const actual = parseNumber('  ');

      expect(actual).toBe(undefined);
    });

    it('GIVEN ""', () => {
      const actual = parseNumber('');

      expect(actual).toBe(undefined);
    });

    it('GIVEN "NotANumber"', () => {
      const actual = () => parseNumber('NotANumber');

      expect(actual).toThrowError('Unexpected <~input: NotANumber ~>');
    });

    it('GIVEN "20"', () => {
      const actual = parseNumber('20');

      expect(actual).toEqual(20);
    });

    it('GIVEN "20.123"', () => {
      const actual = parseNumber('20.123');

      expect(actual).toEqual(20.123);
    });

    it('GIVEN 20.123', () => {
      const actual = parseNumber(20.123);

      expect(actual).toEqual(20.123);
    });

    it('GIVEN boolean true', () => {
      const actual = parseNumber(true);

      expect(actual).toEqual(1);
    });

    it('GIVEN boolean false', () => {
      const actual = parseNumber(false);

      expect(actual).toEqual(0);
    });
  });

  describe('parseBoolean', () => {
    it('GIVEN undefined THEN undefined', () => {
      const actual = parseBoolean(undefined);

      expect(actual).toBe(undefined);
    });

    it('GIVEN null THEN undefined', () => {
      const actual = parseBoolean(null);

      expect(actual).toBe(undefined);
    });

    it('GIVEN "  " THEN undefined', () => {
      const actual = parseBoolean('  ');

      expect(actual).toBe(undefined);
    });

    it('GIVEN "" THEN undefined', () => {
      const actual = parseBoolean('');

      expect(actual).toBe(undefined);
    });

    it('GIVEN boolean true THEN true', () => {
      const actual = parseBoolean(true);

      expect(actual).toBe(true);
    });

    it('GIVEN boolean false THEN false', () => {
      const actual = parseBoolean(false);

      expect(actual).toBe(false);
    });

    it('GIVEN random string THEN true', () => {
      const actual = parseBoolean(randomString());

      expect(actual).toBe(true);
    });

    it('GIVEN string true THEN true', () => {
      const actual = parseBoolean('true');

      expect(actual).toBe(true);
    });

    it('GIVEN string TRUE THEN true', () => {
      const actual = parseBoolean('TRUE');

      expect(actual).toBe(true);
    });

    it('GIVEN string t THEN true', () => {
      const actual = parseBoolean('t');

      expect(actual).toBe(true);
    });

    it('GIVEN string T THEN true', () => {
      const actual = parseBoolean('T');

      expect(actual).toBe(true);
    });

    it('GIVEN string false THEN false', () => {
      const actual = parseBoolean('false');

      expect(actual).toBe(false);
    });

    it('GIVEN string FALSE THEN false', () => {
      const actual = parseBoolean('FALSE');

      expect(actual).toBe(false);
    });

    it('GIVEN string f THEN false', () => {
      const actual = parseBoolean('f');

      expect(actual).toBe(false);
    });

    it('GIVEN string F THEN false', () => {
      const actual = parseBoolean('F');

      expect(actual).toBe(false);
    });

    it('GIVEN string 2 THEN true', () => {
      const actual = parseBoolean('2');

      expect(actual).toBe(true);
    });

    it('GIVEN string 1 THEN true', () => {
      const actual = parseBoolean('1');

      expect(actual).toBe(true);
    });

    it('GIVEN string 0 THEN false', () => {
      const actual = parseBoolean('0');

      expect(actual).toBe(false);
    });

    it('GIVEN number 2 THEN true', () => {
      const actual = parseBoolean(2);

      expect(actual).toBe(true);
    });

    it('GIVEN number 1 THEN true', () => {
      const actual = parseBoolean(1);

      expect(actual).toBe(true);
    });

    it('GIVEN number 0 THEN false', () => {
      const actual = parseBoolean(0);

      expect(actual).toBe(false);
    });
  });
});
