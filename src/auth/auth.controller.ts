import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CodeDto } from './dto/code.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Get('userinfo')
  async getUserInfoByCode(@Headers('Authorization') token: string) {
    return await this.authService.getUserInfo(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('token')
  getToken(@Body() codeDto: CodeDto) {
    return this.authService.getToken(codeDto);
  }
}
