import { IsNotEmpty } from 'class-validator';

export class CodeDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  redirectUri: string;
}
