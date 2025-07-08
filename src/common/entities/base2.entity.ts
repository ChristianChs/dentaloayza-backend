import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  //Index,
} from 'typeorm';

export abstract class BaseEntity2 {
  @ApiProperty()
  @Column('boolean', {
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

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
}
