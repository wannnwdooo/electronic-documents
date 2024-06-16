import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Template } from './template.entity';

@Entity()
export class AttributeField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: 'string' | 'number' | 'date';

  @ManyToOne(() => Template, (template) => template.attributeFields)
  template: Template;
}
