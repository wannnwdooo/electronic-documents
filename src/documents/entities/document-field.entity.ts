import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Document } from './document.entity';

@Entity()
export class DocumentField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  value: string;

  @ManyToOne(() => Document, (document) => document.attributeFields, {
    onDelete: 'CASCADE',
  })
  document: Document;
}
