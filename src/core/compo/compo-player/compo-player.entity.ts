import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Person } from '../../person/person.entity';
import { Compo } from '../compo.entity';
import { TeamIncarnation } from '../../team/team-incarnation/team-incarnation.entity';

/*
   A CompoPlayer is just a record of a particular player playing in a particular
   compo (i.e match/fixture/tie/game).

   It's just a join table.
 */
@Entity()
@Index(['compo', 'team', 'player'], { unique: true })

export class CompoPlayer {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Compo, compoId => compoId.roster, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'compoId'})
  compo: Compo;

  @ManyToOne(type => TeamIncarnation, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'teamId'})
  team: TeamIncarnation;

  @ManyToOne(type => Person, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'personId'})
  player: Person;
}
