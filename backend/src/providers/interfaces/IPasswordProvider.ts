/* eslint-disable no-unused-vars */

export interface IPasswordProvider {
  hash(item: string): Promise<string>;
  compare(item: string, hashedItem: string): Promise<boolean>;
  generate(length: number, includeSymbols: boolean): Promise<string>;
}
