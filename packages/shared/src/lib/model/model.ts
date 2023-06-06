export interface Model {
  readonly id: number;
  readonly uuid: string;

  readonly creationDate: Date;
  readonly updateDate: Date | undefined;
  readonly deleted: Date | undefined | null;
}
