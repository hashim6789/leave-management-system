import { IController, LogoutController } from '@/controllers';

export function logoutComposer(): IController {
  const controller: IController = new LogoutController();
  return controller;
}
