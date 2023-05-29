import { Injectable } from '@nestjs/common';

import { RegisterDto } from './dto';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  async register(user: RegisterDto) {
    return;
  }

  async login(user: LoginDto) {
    return;
  }

  isAuthenticated(jwt: string) {
    return;
  }

  async me(userId: string) {
    return;
  }
}
