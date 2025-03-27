import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 45,
  })
  denominacion: string;

  @Column('varchar', {
    length: 45,
  })
  descripcion: string;

  @OneToMany(() => User, (user) => user.rol)
  user: User[];
}
