import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ description: 'Логин', nullable: false })
  login!: string;

  @ApiProperty({ description: 'Пароль', nullable: false })
  password!: string;

  @ApiProperty({ description: 'Ф.И.О', nullable: false })
  fio!: string;
}
