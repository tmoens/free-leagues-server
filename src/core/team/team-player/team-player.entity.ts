import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Person } from '../../person/person.entity';
import { TeamIncarnation } from '../team-incarnation/team-incarnation.entity';

/*
   A TeamPlayer is a player who is on the roster of a particular incarnation
   of a team.  So properly, this should have been a TeamIncarnationPlayer.

   It's just a join table.
 */
@Entity()
@Index(['teamIncarnation', 'player'], { unique: true })

export class TeamPlayer {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => TeamIncarnation, teamIncarnationId => teamIncarnationId.roster, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'teamIncarnationId'})
  teamIncarnation: TeamIncarnation;

  @ManyToOne(type => Person, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'personId'})
  player: Person;
}
