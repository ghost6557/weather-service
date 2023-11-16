import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty({ description: 'Логин', nullable: false })
  login!: string;

  @ApiProperty({ description: 'Пароль', nullable: false })
  password!: string;
}
