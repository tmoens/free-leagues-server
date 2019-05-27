import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  TreeLevelColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn, UpdateDateColumn, VersionColumn,
} from 'typeorm';
import { GroupSchema } from '../../meta-data/group-schema/group-schema.entity';
import { Exclude, Type } from 'class-transformer';
import { Org } from '../org/org.entity';
import { Sport } from '../sport/sport.entity';

/*
  A "Group" is a grouping within an actual league.  It could represent, for example,
  a league or a conference in a league or a division within a conference.  Groups
  are hierarchically organized.

  Groups in a specific league are organized according to the group schema for that
  league (assuming there is a group schema for the league).

  In a tournament context, a group is an event like "Over 10 Gold Girls"
 */
@Entity()
@Tree('closure-table')
export class Group {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Group, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'groupSchemaId'})
  groupSchema: GroupSchema;

  // The organization associated with the group.
  // Defaults from this organization inform the configuration of any
  // group associated with an organization.
  // Typically only used for the root group of a hierarchy.
  @Type(() => Org)
  @ManyToOne(type => Org, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  org: Org;

  // The sport associated with the tl.
  // Can be used if there is no Org or if the user wants to override the Org's
  // default sport.
  // By default it is the sport associated with the tl's Org (if present).
  @Type(() => Sport)
  @ManyToOne(type => Sport, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  sport: Sport;

  @Column()
  name: string;

  // The start and end date for a group - typically only used for the root
  // of a group hierarchy but can be overridden.
  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column('varchar', {
    nullable: true,
    comment: 'This short name gets used in space-constrained areas',
  })
  nameShort: string;

  @Column('varchar', {
    nullable: true,
  })
  competitionSchema: string;

  @Column('varchar', {
    nullable: true,
  })
  scheduleSchema: string;

  @Column('varchar', {
    nullable: true,
  })
  pointsSchema: string;

  @Column('varchar', {
    nullable: true,
  })
  description: string;

  @Column('simple-json', {
    nullable: true,
    default: '{}',
  })
  lexicon: object;

  @TreeChildren()
  children: Group[];

  @TreeParent()
  parent: Group;

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
