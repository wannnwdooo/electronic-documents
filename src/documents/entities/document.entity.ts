import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DocumentField } from './document-field.entity';
import { Template } from '../../templates/entities';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Template)
  template: Template;

  @OneToMany(() => DocumentField, (documentField) => documentField.document, {
    cascade: true,
  })
  attributeFields: DocumentField[];
}
