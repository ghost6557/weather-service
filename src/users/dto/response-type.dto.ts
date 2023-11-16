import { ApiProperty } from '@nestjs/swagger';

export class RegisterSignInRespDto {
  @ApiProperty({ description: 'Ф.И.О', nullable: false })
  fio: string;

  @ApiProperty({ description: 'Токен', nullable: false })
  apiToken: string;
}
