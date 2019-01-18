import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, } from 'typeorm';
import { Group } from '../../group/group.entity';
import { Team } from '../team.entity';
import { Person } from '../../person/person.entity';
import { TeamPlayer } from '../team-player/team-player.entity';

/*
   A teamIncarnation is an incarnation of a particular team in a particular
   group (i.e. league/conference/division/pool, etc.).

   Teams can exist year over year in the same league, so we keep static
   stuff about the team in the "team" entity and the details of this
   incarnation of the team here.
 */
@Entity()
export class TeamIncarnation {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  // What league/conference/division/pool are you in this time?
  // TODO Vancouver Traffic with a fixed roster played in two pools at most tournaments.
  @ManyToOne(type => Group, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'groupId'})
  groupId: Group;

  @ManyToOne(type => Team, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'teamId'})
  team: Team;

  @OneToMany(type => TeamPlayer, teamPlayers => teamPlayers.teamIncarnation, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  roster: Person[];
}
