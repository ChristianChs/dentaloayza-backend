import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import {
  LoginUserDto,
  CreateUserDto,
  CreateRoleDto,
  UpdateRoleDto,
} from './dto';
import { JwtPayload } from './interfaces';
import { Rol, User } from './entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    private readonly jwtService: JwtService,
  ) {}
  // SECCIÓN USUARIOS
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
    const { username, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { username },
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
  // SECCIÓN ROLES
  async getRoles() {
    const roles = await this.rolRepository.find();
    return roles;
  }

  async getRole(uuid: string) {
    const role = await this.rolRepository.findOneBy({ uuid });
    if (!role) throw new NotFoundException(`Rol con ID ${uuid} no encontrado`);
    return role;
  }

  async createRole(createRoleDto: CreateRoleDto) {
    try {
      const role = this.rolRepository.create(createRoleDto);
      await this.rolRepository.save(role);
      return role;
    } catch (error) {
      this.handleExceptionDb(error);
    }
  }

  async updateRole(uuid: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.getRole(uuid);
    Object.assign(role, updateRoleDto);
    try {
      await this.rolRepository.save(role);
      return role;
    } catch (error) {
      this.handleExceptionDb(error);
    }
  }

  async deleteRole(uuid: string) {
    const role = await this.getRole(uuid);
    try {
      const result = await this.rolRepository.softDelete(role.id);
      if (!result.affected)
        throw new NotFoundException(
          `No se pudo eliminar el rol con UUID ${uuid}`,
        );
      return { message: `Rol con UUID ${uuid} eliminado` };
    } catch (error) {
      this.handleExceptionDb(error);
    }
  }

  // SECCIÓN PRIVADA
  private handleExceptionDb(error: any) {
    if (error.code === 'ER_DUP_ENTRY')
      throw new ConflictException(`Username o email ya existen en la db`);
    throw new InternalServerErrorException(
      `Unexpected error, check server logs : ${error.message}`,
    );
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
