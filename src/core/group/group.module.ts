import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { GroupRepository } from './group.repository';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group } from './group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, GroupRepository]),
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
