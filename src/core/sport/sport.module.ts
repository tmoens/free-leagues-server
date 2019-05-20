import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from './sport.entity';
import { SportRepository } from './sport.repository';
import { SportController } from './sport.controller';
import { SportService } from './sport.service';
import { ExternalOrgModule } from '../external-data/external-org/external-org.module';
import { CompoSchemaModule } from '../../meta-data/compo-schema/compo-schema.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sport, SportRepository]),
    ExternalOrgModule,
    CompoSchemaModule,
  ],
  providers: [
    SportService,
  ],
  controllers: [
    SportController,
  ],
  exports: [
    SportModule,
  ],
})
export class SportModule {}
