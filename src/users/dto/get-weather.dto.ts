import { ApiProperty } from '@nestjs/swagger';

export class GetWeatherDto {
  @ApiProperty({ description: 'Токен', nullable: false })
  apiToken!: string;

  @ApiProperty({ description: 'Город', nullable: false })
  city!: string;

  @ApiProperty({ description: 'Язык', nullable: true })
  language?: string;
}
