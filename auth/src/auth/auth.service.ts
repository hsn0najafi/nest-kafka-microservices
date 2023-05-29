import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterDto } from './dto';
import { LoginDto } from './dto';
import { User } from './entities';
import { comparePassword, hashPassword } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register({ username, password, name }: RegisterDto) {
    try {
      const userExist = await this.usersRepository.findOneBy({ username });
      if (userExist) {
        throw new ConflictException('Username is already exist.');
      }

      const hash = await hashPassword(password);
      const user = await this.usersRepository.save({
        username,
        password: hash,
        name,
      });

      return {
        id: user.id,
        username,
        name,
      };
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async login({ username, password }: LoginDto) {
    try {
      const user = await this.usersRepository.findOneBy({ username });
      if (!user) {
        throw new ForbiddenException('Username or password are not correct.');
      }

      const validPassword = await comparePassword(password, user.password);
      if (!validPassword) {
        throw new ForbiddenException('Username or password are not correct.');
      }

      const accessToken = this.jwtService.sign({
        id: user.id,
        username,
        role: 'user',
      });

      return {
        accessToken,
      };
    } catch (err) {
      throw new RpcException(err);
    }
  }

  isAuthenticated(jwt: string) {
    try {
      if (this.jwtService.verify(jwt)) {
        return 'yes';
      }
      return 'no';
    } catch (err) {
      return 'no';
    }
  }

  async me(userId: string) {
    try {
      const user = await this.usersRepository.findOneBy({
        id: +userId,
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      const { id, name, username } = user;

      return {
        id,
        name,
        username,
      };
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
