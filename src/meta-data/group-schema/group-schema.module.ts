import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GroupSchema} from './group-schema.entity';
import {GroupSchemaService} from './group-schema.service';
import {GroupSchemaController} from './group-schema.controller';
import {GroupSchemaRepository} from './group-schema.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupSchema, GroupSchemaRepository]),
  ],
  providers: [
    GroupSchemaService,
  ],
  controllers: [
    GroupSchemaController,
  ],
  exports: [
    GroupSchemaModule,
  ],
})
export class GroupSchemaModule {}
