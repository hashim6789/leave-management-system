import * as bcrypt from 'bcryptjs';
import { IPasswordProvider } from '../interfaces';

export class PasswordProvider implements IPasswordProvider {
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

  async generate(length: number, includeSymbols: boolean): Promise<string> {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = letters + numbers + (includeSymbols ? symbols : '');

    let password = '';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * allChars.length);
      password += allChars[index];
    }

    return password;
  }
}
