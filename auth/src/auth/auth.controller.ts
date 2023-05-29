import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register')
  async register(@Payload('body') payload: RegisterDto) {
    console.log('-------------- Register -------------');
    return await this.authService.register(payload);
  }

  @MessagePattern('login')
  async login(@Payload('body') payload: LoginDto) {
    console.log('-------------- Auth / Login -------------');
    return await this.authService.login(payload);
  }

  @MessagePattern('isAuthenticated')
  async checkAccess(@Payload('body') payload: string) {
    console.log('-------------- Auth / isAuthenticated -------------');
    return this.authService.isAuthenticated(payload);
  }

  @MessagePattern('me')
  async me(@Payload('body') payload: string) {
    console.log('-------------- Auth / Me -------------');
    return await this.authService.me(payload);
  }
}
