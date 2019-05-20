import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalOrg } from './external-org.entity';
import { ExternalOrgRepository } from './external-org.repository';
import { ExternalOrgController } from './external-org.controller';
import { ExternalOrgService } from './external-org.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExternalOrg, ExternalOrgRepository]),
  ],
  providers: [
    ExternalOrgService,
  ],
  controllers: [
    ExternalOrgController,
  ],
  exports: [
    ExternalOrgModule,
  ],
})
export class ExternalOrgModule {}
