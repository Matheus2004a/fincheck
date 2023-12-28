import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  authenticate(@Body() authenticateDto: AuthenticateDto) {
    return this.authService.signin(authenticateDto);
  }

  @Post('signup')
  create(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
