import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupSchemaModule } from './meta-data/group-schema/group-schema.module';
import { ScoreSchemaModule } from './meta-data/score-schema/score-schema.module';
import { CompoSchemaService } from './meta-data/compo-schema/compo-schema.service';
import { CompoSchemaController } from './meta-data/compo-schema/compo-schema.controller';
import { CompoSchemaModule } from './meta-data/compo-schema/compo-schema.module';
import { ScoreService } from './core/score/score.service';
import { ScoreModule } from './core/score/score.module';
import { CompoController } from './core/compo/compo.controller';
import { CompoModule } from './core/compo/compo.module';
import { OrgModule } from './core/org/org.module';
import { OrgService } from './core/org/org.service';
import { PersonController } from './core/person/person.controller';
import { PersonService } from './core/person/person.service';
import { PersonModule } from './core/person/person.module';
import { TeamModule } from './core/team/team.module';
import { TeamIncarnationService } from './core/team/team-incarnation/team-incarnation.service';
import { TeamIncarnationController } from './core/team/team-incarnation/team-incarnation.controller';
import { TeamIncarnationModule } from './core/team/team-incarnation/team-incarnation.module';
import { TeamPlayerService } from './core/team/team-player/team-player.service';
import { TeamPlayerController } from './core/team/team-player/team-player.controller';
import { TeamPlayerModule } from './core/team/team-player/team-player.module';
import { CompoPlayerModule } from './core/compo/compo-player/compo-player.module';
import { ExternalOrgModule } from './core/external-data/external-org/external-org.module';
import { ExternalIdentityModule } from './core/external-data/external-identity/external-identity.module';
import { SportController } from './core/sport/sport.controller';
import { SportModule } from './core/sport/sport.module';
import { TermModule } from './meta-data/terminology/term/term.module';
import { TermController } from './meta-data/terminology/term/term.controller';
import { VocabularyController } from './meta-data/terminology/vocabulary/vocabulary.controller';
import { VocabularyModule } from './meta-data/terminology/vocabulary/vocabulary.module';
import { GroupController } from './core/group/group.controller';
import { GroupModule } from './core/group/group.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CompoModule,
    CompoPlayerModule,
    CompoSchemaModule,
    ConfigModule,
    ExternalIdentityModule,
    ExternalOrgModule,
    GroupSchemaModule,
    GroupModule,
    OrgModule,
    PersonModule,
    ScoreModule,
    ScoreSchemaModule,
    SportModule,
    TeamIncarnationModule,
    TeamModule,
    TeamPlayerModule,
    TermModule,
    VocabularyModule,
  ],
  controllers: [
    AppController,
    CompoSchemaController,
    CompoController,
    GroupController,
    PersonController,
    TeamIncarnationController,
    TeamPlayerController,
    SportController,
    TermController,
    VocabularyController,
  ],
  providers: [
    AppService,
    CompoSchemaService,
    ScoreService,
    OrgService,
    PersonService,
    TeamIncarnationService,
    TeamPlayerService],
})
export class AppModule {}
