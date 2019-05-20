import { Module } from '@nestjs/common';
import { ExternalIdentityService } from './external-identity.service';
import { ExternalIdentityController } from './external-identity.controller';

@Module({
  providers: [ExternalIdentityService],
  controllers: [ExternalIdentityController]
})
export class ExternalIdentityModule {}
