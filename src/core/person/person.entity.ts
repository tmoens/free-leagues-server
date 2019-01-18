import { Entity, Tree, Column, PrimaryGeneratedColumn,
  TreeChildren, TreeParent, TreeLevelColumn,
  ManyToOne, JoinColumn } from 'typeorm';
import { ScoreSchema } from '../../meta-data/score-schema/score-schema.entity';
import { Org } from '../org/org.entity';

/*
   Just an individual.  The most obvious thing is a person who plays
   on a team in a league who is therefore a player.

   But we can also imagine a person who is an administrator or a
   referee or a volunteer who is a member of some organization.

   We imaginge it is possible to have a person who belongs to multiple
   organizations, and this is going to be a nightmare which we are not
   going to solve right this minute.

   We also need to allow for all kinds of mappings from identifiers outside
   of our system to identifiers inside our system.

   For now we just need to have a person so we can have players on teams.
 */
@Entity()
export class Person {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  primaryPhone: string;

  @Column()
  secondaryPhone: string;

  @Column()
  primaryEmail: string;

  @Column('datetime')
  dob: Date;

  @Column()
  address: string;

  // TODO List of organizations and org specific data including org specific id
}
