import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tasks' })
export class BoardTask extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  boardId: string;

  @Column({ type: 'uuid', nullable: true })
  columnId: string | null;

  @Column({ type: 'uuid', nullable: true })
  userId: string | null;

  @Column('varchar')
  description: string;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column('integer')
  order: number;
}
