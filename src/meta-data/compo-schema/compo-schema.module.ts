import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompoSchema } from './compo-schema.entity';
import { CompoSchemaService } from './compo-schema.service';
import { CompoSchemaController } from './compo-schema.controller';
import { OrgModule } from '../../core/org/org.module';
import { CompoSchemaRepository } from './compo-schema.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompoSchema, CompoSchemaRepository]),
    OrgModule,
  ],
  providers: [
    CompoSchemaService,
  ],
  controllers: [
    CompoSchemaController,
  ],
  exports: [
    CompoSchemaModule,
  ],
})
export class CompoSchemaModule {}
