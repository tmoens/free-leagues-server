import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  ManyToOne,
  JoinColumn,
  CreateDateColumn, UpdateDateColumn, VersionColumn,
} from 'typeorm';
import { GroupSchema } from '../../meta-data/group-schema/group-schema.entity';
import { Exclude, Expose, Type } from 'class-transformer';
import { Org } from '../org/org.entity';
import { Sport } from '../sport/sport.entity';

/*
  A "Group" is a grouping within an actual league or tournament.
  In the context of a league, it could represent, a league or a conference in
  a league or a division within a conference.

  In the context of a tournament, a group can be an event like "Over 10
  Gold Girls"

  Groups are hierarchically organized.

  Groups in a specific league are organized according to the group schema for that
  league (assuming there is a group schema for the league which I am beginning
  to doubt there will be).
 */
@Entity()
@Tree('closure-table')
export class Group {
  // The group's "effective sport" is either it's own sport of the sport of the
  // closest parent group that has a sport or the sport of the Organization at
  // the root of the tree of groups (i.e. the league or the tournament).
  // It is not persisted.
  effectiveSport: Sport;

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
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  sport: Sport;

  @Column()
  name: string;

  @Column('varchar', {
    nullable: true,
    comment: 'This short name gets used in space-constrained areas',
  })
  nameShort: string;

  // The start and end date for a group - typically only used for the root
  // of a group hierarchy but can be overridden for any group.
  @Column('datetime', {
  nullable: true,
  })
  startDate: Date;

  @Column('datetime', {
    nullable: true,
  })
  endDate: Date;

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
  @Type(() => Group)
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
