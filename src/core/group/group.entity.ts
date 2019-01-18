import { Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, TreeLevelColumn, Generated, ManyToOne, JoinColumn } from 'typeorm';
import { GroupSchema } from '../../meta-data/group-schema/group-schema.entity';

/*
    A "Group" is a grouping within an actual league.  It could represent, for example,
    a league or a conference in a league or a division within a conference.  Groups
    are hierarchically organized.

    Groups in a specific league are organized according to the group schema for that
    league.
 */
@Entity()
@Tree('closure-table')
export class Group {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Group, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'groupSchemaId'})
  groupSchema: GroupSchema;

  @Column()
  name: string;

  @Column('varchar', {
    nullable: true,
    comment: 'This short name gets used in space-constrained areas',
  })
  nameShort: string;

  @Column('varchar', {
    default: 'game',
    comment: 'The name for a competition between two teams (game, fixture, tie, match)',
  })
  compoName: string;

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
  scheduleOneToManyCompetitions: string;

  @Column('varchar', {
    nullable: true,
  })
  description: string;

  @TreeChildren()
  children: Group[];

  @TreeParent()
  parent: Group;

  @TreeLevelColumn()
  level: number;

}
