import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Rol } from './role.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @ApiProperty()
  @Column('varchar', {
    unique: true,
    length: 45,
  })
  username: string;

  @Column('varchar', {
    length: 255,
  })
  password: string;

  @ApiProperty()
  @Column('varchar', {
    length: 150,
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column('varchar', {
    length: 36,
  })
  uuid: string;

  @ApiProperty()
  @Column('boolean', {
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @ManyToOne(() => Rol, (rol) => rol.user)
  rol: string;

  @BeforeInsert()
  generateUUID() {
    this.uuid = uuid();
  }
}
