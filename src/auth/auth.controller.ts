import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginUserDto,
  CreateUserDto,
  CreateRoleDto,
  UpdateRoleDto,
} from './dto';
// import { Auth } from './decorators/auth.decorator';
// import { ValidRoles } from './interfaces/valid-role.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Auth(ValidRoles.admin)
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('roles')
  getRoles() {
    return this.authService.getRoles();
  }

  @Get('roles/:uuid')
  getRole(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.authService.getRole(uuid);
  }

  @Post('roles')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.authService.createRole(createRoleDto);
  }

  @Patch('roles/:uuid')
  updateRole(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.authService.updateRole(uuid, updateRoleDto);
  }

  @Delete('roles/:uuid')
  deleteRole(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.authService.deleteRole(uuid);
  }
}
