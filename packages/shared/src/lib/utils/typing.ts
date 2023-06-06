export type DeepPartial<T> =
  | T
  | (T extends Array<infer U>
      ? DeepPartial<U>[]
      : T extends Map<infer K, infer V>
      ? Map<DeepPartial<K>, DeepPartial<V>>
      : T extends Set<infer M>
      ? Set<DeepPartial<M>>
      : T extends object
      ? {
          [K in keyof T]?: DeepPartial<T[K]>;
        }
      : T);

export class Pagination<T> {
  constructor(readonly count: number, readonly data: T[], readonly page: number, readonly pageCount: number, readonly total: number) {}
  static empty() {
    return new Pagination(0, [], 0, 0, 0);
  }
}

export type PaginatedType<T> = T extends Pagination<infer U> ? U : never;

export type PaginatedKey<T> = {
  [K in keyof T]: T[K] extends Pagination<any> ? K : never;
}[keyof T];

export type NumberKey<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export type ArrayKey<T> = {
  [K in keyof T]: T[K] extends Array<any> ? K : never;
}[keyof T];
