import { DeepPartial, Repository } from 'typeorm';
import { AbstractDocumentsRepository } from './documents.interfaces';
import { Document } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

export class DocumentsRepository implements AbstractDocumentsRepository {
  constructor(
    @InjectRepository(Document)
    private readonly documentsRepository: Repository<Document>,
  ) {}

  async create(dto: DeepPartial<Document>): Promise<Document> {
    const document = this.documentsRepository.create(dto);
    return this.documentsRepository.save(document);
  }
  async findAll(): Promise<Document[]> {
    return this.documentsRepository.find({
      relations: { template: { attributeFields: true }, attributeFields: true },
    });
  }
  async findOne(id: number): Promise<Document> {
    const document = await this.documentsRepository.findOne({
      where: { id },
      relations: { template: { attributeFields: true }, attributeFields: true },
    });
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    return document;
  }
  async update(document: DeepPartial<Document>): Promise<Document> {
    return this.documentsRepository.save(document);
  }
  async remove(id: number): Promise<void> {
    const res = await this.documentsRepository.delete(id);
    if (!res.affected) {
      throw new NotFoundException('Document not found');
    }
  }
}
