import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ValidationPipe } from './validation.pipe';
import { SignInUserDto } from './dto/signin-user.dto';
import { GetWeatherDto } from './dto/get-weather.dto';
import { RegisterSignInRespDto } from './dto/response-type.dto';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Пользовательские действия')
@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiOkResponse({
    description: 'Пользователь будет зарегистрирован',
    type: RegisterSignInRespDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Логин уже существует, либо неверный пароль',
  })
  register(@Body(new ValidationPipe()) registerUserDto: RegisterUserDto) {
    return this.usersService.registration(registerUserDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiOkResponse({
    description: 'Пользователь будет авторизован',
    type: RegisterSignInRespDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Неверные данные для авторизации',
  })
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.usersService.authorization(signInUserDto);
  }

  @Post('getweather')
  @ApiOperation({ summary: 'Получение информации о погоде' })
  @ApiOkResponse({
    description: 'Пользователю будет отправлена информация о погоде',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Невалидный токен',
  })
  getWeather(@Body() getWeatherDto: GetWeatherDto) {
    return this.usersService.getWeather(getWeatherDto);
  }
}
