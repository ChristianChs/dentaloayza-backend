import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from './dto';
import { Auth } from './decorators/auth.decorator';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { User } from './entities';
import { LoginResponseDto } from './dto/login-response.dto';
// import { Auth } from './decorators/auth.decorator';
// import { ValidRoles } from './interfaces/valid-role.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @Post('register')
  @Auth()
  @ApiResponse({
    status: 201,
    description: 'User successfully registered.',
    type: User,
  })
  @ApiResponse({ status: 409, description: 'Conflict. User already exists.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid credentials.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // @Get('roles')
  // getRoles() {
  //   return this.authService.getRoles();
  // }

  // @Get('roles/:uuid')
  // getRole(@Param('uuid', ParseUUIDPipe) uuid: string) {
  //   return this.authService.getRole(uuid);
  // }

  // @Post('roles')
  // createRole(@Body() createRoleDto: CreateRoleDto) {
  //   return this.authService.createRole(createRoleDto);
  // }

  // @Patch('roles/:uuid')
  // updateRole(
  //   @Param('uuid', ParseUUIDPipe) uuid: string,
  //   @Body() updateRoleDto: UpdateRoleDto,
  // ) {
  //   return this.authService.updateRole(uuid, updateRoleDto);
  // }

  // @Delete('roles/:uuid')
  // deleteRole(@Param('uuid', ParseUUIDPipe) uuid: string) {
  //   return this.authService.deleteRole(uuid);
  // }
}
