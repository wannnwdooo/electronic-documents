import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      url: configService.get('typeorm.url'),
      type: configService.get('typeorm.type'),
      synchronize: configService.get('typeorm.synchronize'),
      autoLoadEntities: configService.get('typeorm.autoLoadEntities'),
      logging: configService.get('typeorm.logging'),
    };
  }
}

export const typeormModuleOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
};

export default registerAs('typeorm', () => ({
  url: process.env.DATABASE_URL,
  type: 'postgres',
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
}));
