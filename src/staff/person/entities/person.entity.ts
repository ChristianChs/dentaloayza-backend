import { BaseEntity } from 'src/common/entities/base.entity';
import { Gender, TipoDocumento } from '../enums';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Specialist } from 'src/staff/specialist/entities/specialist.entity';

@Entity('personas')
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', {
    enum: TipoDocumento,
    default: TipoDocumento.DNI,
    name: 'tipo_documento',
  })
  tipoDocumento: TipoDocumento;

  @Column('varchar', {
    length: 20,
    unique: true,
    name: 'numero_documento',
    nullable: false,
  })
  numeroDocumento: string;

  @Column('varchar', {
    length: 250,
  })
  nombre: string;

  @Column('varchar', {
    length: 250,
    name: 'apellido_paterno',
    nullable: false,
  })
  apellidoPaterno: string;

  @Column('varchar', {
    length: 250,
    name: 'apellido_materno',
    nullable: false,
  })
  apellidoMaterno: string;

  @Column('date', {
    name: 'fecha_nacimiento',
  })
  fechaNacimiento: string;

  @Column('enum', {
    enum: Gender,
  })
  sexo: Gender;

  @Column('varchar', {
    length: 250,
  })
  direccion: string;

  @Column('varchar', {
    length: 9,
  })
  telefono: string;

  @OneToOne(() => Specialist, (especialista) => especialista.persona)
  especialista?: Specialist;
}
