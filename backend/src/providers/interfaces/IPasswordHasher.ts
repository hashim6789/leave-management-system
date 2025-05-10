/* eslint-disable no-unused-vars */

export interface IPasswordHasher {
  hash(item: string): Promise<string>;
  compare(item: string, hashedItem: string): Promise<boolean>;
}
