import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GroupSchema} from './group-schema.entity';
import {GroupService} from './group-schema.service';
import {GroupController} from './group-schema.controller';
import {GroupRepository} from './group-schema.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupSchema, GroupRepository]),
  ],
  providers: [
    GroupService,
  ],
  controllers: [
    GroupController,
  ],
  exports: [
    GroupService,
  ],
})
export class GroupModule {}
