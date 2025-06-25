import { BaseEntity } from '../../../common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('antecedentes')
export class Antecedente extends BaseEntity {
  @Column('varchar', {
    length: 255,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column('text', {
    nullable: true,
  })
  description: string;
}
