import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AttributeField } from './attribute-field.entity';

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(
    () => AttributeField,
    (attributeField) => attributeField.template,
    { cascade: true },
  )
  attributeFields: AttributeField[];
}
