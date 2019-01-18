import { Module } from '@nestjs/common';
import { OrgController } from './org.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Org } from './org.entity';
import { OrgRepository } from './org.repository';
import { OrgService } from './org.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Org, OrgRepository]),
  ],
  providers: [
    OrgService,
  ],
  controllers: [
    OrgController,
  ],
  exports: [
    OrgService,
  ],
})
export class OrgModule {}
