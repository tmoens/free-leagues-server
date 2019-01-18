import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TeamIncarnation } from './team-incarnation/team-incarnation.entity';

/*
   A team is only a team.
   Teams can exist year over year in the same league, so we keep static
   stuff about the team here and we have a separate record for each
   incarnation of the team over the years.  For example, the Florida Marlins
   are the Florida Marlins in spite of the fact that there are no players on
   on the 2018 roster that were on the 1998 roster.
 */
@Entity()
export class Team {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  website: string;

  @OneToMany(type => TeamIncarnation, teamIncarnation => teamIncarnation.team, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  incarnations: TeamIncarnation[];
}
