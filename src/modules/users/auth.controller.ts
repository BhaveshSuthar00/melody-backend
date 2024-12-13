import { Controller, Post, Body, BadRequestException, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    try {
      return await this.authService.signup(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('signin')
  async signin(@Request() req:any): Promise<any> {
    try {
      return await this.authService.signin(req);
    }
    catch(error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('registerAdmin')
  async registerAdmin(@Body() body : any) {
    try {
      return await this.authService.registerAdmin(body);
    }
    catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
