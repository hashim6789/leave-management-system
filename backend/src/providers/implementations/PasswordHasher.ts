import * as bcrypt from 'bcryptjs';
import { IPasswordHasher } from '../interfaces';

export class PasswordHasher implements IPasswordHasher {
  private readonly saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  async hash(item: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(item, salt);
    return hash;
  }

  async compare(item: string, hashedItem: string): Promise<boolean> {
    return bcrypt.compare(item, hashedItem);
  }
}
