import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesModule } from './templates/templates.module';
import { DocumentsModule } from './documents/documents.module';
import typeormConfig, { typeormModuleOptions } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync(typeormModuleOptions),
    TemplatesModule,
    DocumentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
