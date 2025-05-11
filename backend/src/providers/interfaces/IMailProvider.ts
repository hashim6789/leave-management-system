/* eslint-disable no-unused-vars */

export interface IMailProvider {
  sendPasswordMail(email: string, password: string): Promise<boolean>;
}
