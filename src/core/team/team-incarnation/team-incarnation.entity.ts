import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Team } from '../team.entity';
import { Person } from '../../person/person.entity';
import { TeamPlayer } from '../team-player/team-player.entity';
import { Exclude } from 'class-transformer';

/*
   A teamIncarnation is an incarnation of a team.  Like the "2020/2021 Hammers"
   or the "2019 Summer Dark Side Of The Disc".

   Rosters for a particular tournament or match or league can be drawn from
   a team incarnation.

   Teams can exist year over year in the same league, so we keep static
   stuff about the team in the "team" entity and the details of this
   incarnation of the team here.
 */
@Entity()
export class TeamIncarnation {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  // What distinguishes this incarnation from any other incarnation
  @Index({ unique: true })
  @Column({
    nullable: false,
  })
  incarnationName: string;

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

  @CreateDateColumn()
  @Exclude()
  creationDate: Date;

  @UpdateDateColumn()
  @Exclude()
  updateDate: Date;

  @VersionColumn()
  @Exclude()
  version: number;
}
