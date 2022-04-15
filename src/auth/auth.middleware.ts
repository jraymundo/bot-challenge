import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../users/user.repository';

import * as jwt from 'jsonwebtoken';

import appConfig from './../config/app';
import { IAuthUser } from './auth.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async use(req: IAuthUser, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, appConfig.jwtSecret);
      const user = await this.userRepository.findOne({ id: decoded.id });

      if (!user) {
        throw new HttpException(
          'Invalid Credentials.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      req.loggedInId = decoded.id;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
