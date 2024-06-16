import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Document } from './entities';
import { CreateDocumentDto, UpdateDocumentDto } from './dto';
import {
  AbstractDocumentsService,
  DocumentResponse,
  DocumentResponseList,
} from './documents.interfaces';
import { DocumentsMapper } from './documents.mapper';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: AbstractDocumentsService) {}

  @Post()
  async create(
    @Body() createDocumentDto: CreateDocumentDto,
  ): Promise<DocumentResponse> {
    const document = await this.documentsService.create(createDocumentDto);
    return DocumentsMapper.toResponse(document);
  }

  @Get()
  async findAll(): Promise<DocumentResponseList> {
    const documents = await this.documentsService.findAll();
    return documents.map((document) => DocumentsMapper.toResponse(document));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Document> {
    const document = await this.documentsService.findOne(id);
    return DocumentsMapper.toResponse(document);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    const document = await this.documentsService.update(id, updateDocumentDto);
    return DocumentsMapper.toResponse(document);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<string> {
    await this.documentsService.remove(id);
    return 'The document was successfully deleted';
  }
}
