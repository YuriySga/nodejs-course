import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'boards' })
export class Board extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column('varchar')
    title: string

  @Column({type: 'json', nullable: true})
    columns: string;

}  
