import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  //Index,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('boolean', {
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @ApiProperty()
  @Column('varchar', {
    length: 36,
    unique: true,
  })
  // @Index({ unique: true })
  uuid: string;

  @ApiProperty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

  @BeforeInsert()
  generateUUID() {
    if (!this.uuid) {
      this.uuid = uuid();
    }
  }
}
