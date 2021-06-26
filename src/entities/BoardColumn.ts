import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'columns' })
export class BoardColumn extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column('uuid')
    boardId: string

  @Column('varchar')
    title: string

  @Column('integer')
    order: string
}  