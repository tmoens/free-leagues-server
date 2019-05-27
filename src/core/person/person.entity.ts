import {
  Entity, Column, PrimaryGeneratedColumn,
  OneToMany, CreateDateColumn, UpdateDateColumn, VersionColumn, Index, Generated,
} from 'typeorm';
import { ExternalIdentity } from '../external-data/external-identity/external-identity.entity';
import { Exclude } from 'class-transformer';

/*
   Just an individual.  The most obvious thing is a person who plays
   on a team in a league who is therefore a player.

   But we can also imagine a person who is an administrator or a
   referee or a volunteer who is a member of some organization.

   We imagine it is possible to have a person who belongs to multiple
   organizations, and this is going to be a nightmare which we are not
   going to solve right this minute.  See external-org.

   We also need to allow for all kinds of mappings from identifiers outside
   of our system to identifiers inside our system.

   For now we just need to have a person so we can have players on teams.
 */
@Entity()
export class Person {

  @PrimaryGeneratedColumn()
  numericId: number;

  @Index({ unique: true })
  @Column()
  @Generated('uuid')
  id: string;

  /* the user's self-chosen identifier */
  @Index({ unique: true })
  @Column({
    nullable: true,
  })
  selfSelectedId: string;

  @Column('varchar', {
    nullable: false,
  })
  firstName: string;

  @Column('varchar', {
    nullable: false,
  })
  lastName: string;

  @Column({
    nullable: true,
  })
  phone: string;

  /* going to make the call that only one person gets any given e-mail */
  /* I can imagine parent/child scenarios where this is sub-optimal. */
  @Index({ unique: true })
  @Column()
  email: string;

  @Column('date', {
    nullable: true,
  })
  dob: Date;

  @OneToMany(type => ExternalIdentity, externalIdentity => externalIdentity.person, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  })
  externalIdentities: ExternalIdentity[];

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
