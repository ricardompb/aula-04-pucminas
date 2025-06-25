import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/public';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

class SignInDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Request() req) {
    const signInDto: SignInDto = req['body'] as SignInDto;
    const token = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    const payload = await this.jwtService.verifyAsync(token.access_token, {
      secret: jwtConstants.secret,
    });

    req['user'] = payload;

    return token;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
