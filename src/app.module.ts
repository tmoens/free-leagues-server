import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { GroupSchemaModule } from './meta-data/group-schema/group-schema.module';
import { ScoreSchemaModule } from './meta-data/score-schema/score-schema.module';
import { CompoSchemaService } from './meta-data/compo-schema/compo-schema.service';
import { CompoSchemaController } from './meta-data/compo-schema/compo-schema.controller';
import { CompoSchemaModule } from './meta-data/compo-schema/compo-schema.module';
import { ScoreService } from './core/score/score.service';
import { ScoreModule } from './core/score/score.module';
import { CompoController } from './core/compo/compo.controller';
import { CompoModule } from './core/compo/compo.module';
import { OrgService } from './core/org/org.service';
import { OrgModule } from './core/org/org.module';
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

@Module({
  imports: [
    ConfigModule,
    GroupSchemaModule,
    TypeOrmModule.forRoot(),
    ScoreSchemaModule,
    CompoSchemaModule,
    ScoreModule,
    CompoModule,
    OrgModule,
    PersonModule,
    TeamModule,
    TeamIncarnationModule,
    TeamPlayerModule,
    CompoPlayerModule,
  ],
  controllers: [AppController, CompoSchemaController, CompoController, PersonController, TeamIncarnationController, TeamPlayerController],
  providers: [AppService, CompoSchemaService, ScoreService, OrgService, PersonService, TeamIncarnationService, TeamPlayerService],

})
export class AppModule {}
