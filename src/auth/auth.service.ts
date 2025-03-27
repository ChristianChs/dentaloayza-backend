import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { password, ...data } = createUserDto;
    try {
      const user = this.userRepository.create({
        ...data,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      return plainToInstance(User, user);
    } catch (error) {
      this.handleExceptionDb(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['uuid', 'username', 'email', 'password'],
    });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales inválidas');
    delete user.password;
    return {
      ...user,
      token: this.getJwtToken({ id: user.uuid }),
    };
  }

  private handleExceptionDb(error: any) {
    if (error.code === 'ER_DUP_ENTRY')
      throw new ConflictException(`Username o email ya existen en la db`);
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
