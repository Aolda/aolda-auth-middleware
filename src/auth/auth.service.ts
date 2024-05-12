import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CodeDto } from './dto/code.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import * as querystring from 'node:querystring';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async getToken(codeDto: CodeDto) {
    const formData = querystring.stringify({
      code: codeDto.code,
      grant_type: 'authorization_code',
      client_id: codeDto.clientId,
      redirect_uri: codeDto.redirectUri,
    });

    const { data } = await firstValueFrom(
      this.httpService
        .post(
          'https://keycloak.aolda.in/realms/aolda/protocol/openid-connect/token',
          formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error.response.data;
          }),
        ),
    );

    return data;
  }

  async getUserInfo(token: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          'https://keycloak.aolda.in/realms/aolda/protocol/openid-connect/userinfo',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            if (error.response.status === HttpStatus.UNAUTHORIZED) {
              throw new HttpException(
                'Unauthorized error message',
                HttpStatus.UNAUTHORIZED,
              );
            } else {
              throw new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }
          }),
        ),
    );

    return data;
  }
}
