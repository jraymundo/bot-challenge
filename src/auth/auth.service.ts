import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/user.repository';

import * as jwt from 'jsonwebtoken';

import appConfig from './../config/app';

@Injectable()
export class AuthService {
  /**
   * AuthService constructor
   *
   * @param {UserRepository} usersRepository
   */
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
  ) {}

  /**
   * Generate a token bearer for the user to access endpoints
   *
   * @param {string} username
   * @param {string} password
   *
   * @return string
   */
  async generateToken(username: string, password: string): Promise<string> {
    const user = await this.usersRepository.findOne({
      username: username,
      password: password,
    });

    if (user instanceof User) {
      return this._createJWT(user);
    }

    throw new UnauthorizedException('Invalid Credentials');
  }

  /**
   * Generate a JWT for the user
   *
   * @private
   * @param {User} user
   * @return string
   */
  _createJWT(user: User): string {
    const today = new Date();
    const expiration = new Date(today);
    expiration.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        exp: expiration.getTime() / 1000,
      },
      appConfig.jwtSecret,
    );
  }
}
