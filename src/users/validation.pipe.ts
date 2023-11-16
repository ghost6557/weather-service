import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: RegisterUserDto, metadata: ArgumentMetadata) {
    const password = value?.password;
    if (password) {
      if (
        password.length >= 6 &&
        [...password].some((chr) => ['.', ',', '!', '_'].includes(chr))
      ) {
        return value;
      } else {
        throw new UnauthorizedException('Пароль не соответствует требованиям');
      }
    } else {
      throw new UnauthorizedException('Пароль не был указан');
    }
  }
}
