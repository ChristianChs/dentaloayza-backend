import { BaseEntity } from 'src/common/entities/base.entity';
import { Gender, TipoDocumento } from '../enums';
import { Column, Entity, OneToOne } from 'typeorm';
import { Specialist } from 'src/staff/specialist/entities/specialist.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('personas')
export class Person extends BaseEntity {
  @ApiProperty()
  @Column('enum', {
    enum: TipoDocumento,
    default: TipoDocumento.DNI,
    name: 'tipo_documento',
  })
  tipoDocumento: TipoDocumento;

  @ApiProperty()
  @Column('varchar', {
    length: 20,
    unique: true,
    name: 'numero_documento',
    nullable: false,
  })
  numeroDocumento: string;

  @ApiProperty()
  @Column('varchar', {
    length: 250,
  })
  nombre: string;

  @ApiProperty()
  @Column('varchar', {
    length: 250,
    name: 'apellido_paterno',
    nullable: false,
  })
  apellidoPaterno: string;

  @ApiProperty()
  @Column('varchar', {
    length: 250,
    name: 'apellido_materno',
    nullable: false,
  })
  apellidoMaterno: string;

  @ApiProperty()
  @Column('date', {
    name: 'fecha_nacimiento',
  })
  fechaNacimiento: string;

  @ApiProperty()
  @Column('enum', {
    enum: Gender,
  })
  sexo: Gender;

  @ApiProperty()
  @Column('varchar', {
    length: 250,
  })
  direccion: string;

  @ApiProperty()
  @Column('varchar', {
    length: 15,
  })
  telefono: string;

  @OneToOne(() => Specialist, (especialista) => especialista.persona)
  especialista?: Specialist;
}
