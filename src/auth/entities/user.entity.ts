import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Specialist } from 'src/staff/specialist/entities/specialist.entity';

export enum UserRole {
  ADMINISTRADOR = 'Administrador',
  DOCTOR = 'Doctor',
  SECRETARIA = 'Secretaria',
}

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

  @Column('enum', {
    enum: UserRole,
    nullable: false,
    default: UserRole.SECRETARIA,
  })
  rol: UserRole;

  @OneToOne(() => Specialist, (specialist) => specialist.user, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_especialista' })
  specialist?: Specialist;

  @BeforeInsert()
  generateUUID() {
    this.uuid = uuid();
  }
}
