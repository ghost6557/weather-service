import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { GetWeatherDto } from './dto/get-weather.dto';
import { Users } from './entities/users.entity';
import { Actions } from './entities/actions.entity';
import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Actions) private actionsRepository: Repository<Actions>,
  ) {}

  async registration(registerUserDto: RegisterUserDto) {
    const { login, password, fio } = registerUserDto;
    const user = await this.usersRepository.findOneBy({ login });
    if (user) {
      throw new UnauthorizedException(
        'Пользователь с таким логином уже зарегистрирован',
      );
    }

    const hashedPassword = await hash(password, 12);

    const token = sign(
      { login, password: hashedPassword },
      process.env.JWT_SECRET_KEY,
    );

    const newUser = this.usersRepository.create({
      login,
      password: hashedPassword,
      fio,
      apiToken: token,
    });

    this.usersRepository.save(newUser);

    return { fio, apiToken: token };
  }

  async authorization(signInUserDto: SignInUserDto) {
    const { login, password } = signInUserDto;
    const user = await this.usersRepository.findOneBy({ login });
    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Неверные данные для авторизации');
    }

    return { fio: user.fio, apiToken: user.apiToken };
  }

  async getWeather(getWeatherDto: GetWeatherDto) {
    const unixTimestamp = Math.round(+new Date() / 1000);
    const { apiToken, city, language } = getWeatherDto;
    let payload;
    try {
      payload = verify(apiToken, process.env.JWT_SECRET_KEY);
    } catch (e) {
      throw new UnauthorizedException('Невалидный токен');
    }

    const user = await this.usersRepository.findOneBy({ login: payload.login });

    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=4a08b7383ef84ec1a0c162415231511&q=${city}&lang=${
        language ?? 'ru'
      }`,
    );

    const data = res.ok && (await res.json());

    const newAction = new Actions();
    newAction.action_time = unixTimestamp;
    newAction.request_result = res.status.toString();
    newAction.temp_c = !res.ok ? null : data.current.temp_c;
    newAction.user = user;

    this.actionsRepository.save(newAction);

    return data ?? { status: res.status, error: 'Ошибка weatherapi' };
  }
}
