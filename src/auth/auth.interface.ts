import { Request } from 'express';

export interface IAuthUser extends Request {
  loggedInId: number;
}
