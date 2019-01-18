import { Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, TreeLevelColumn } from 'typeorm';

/*
    A GroupSchema is a schema of groupings that can be used to set up a league.
    For example, one could create a schema for the NHL which would have a "League"
    at the top level with "Conference" level within it and "Division" level within
    the "Conferences" level.

    The schema doe not represent any one hierarcy of groupings in particular.
 */
@Entity()
@Tree('closure-table')
export class GroupSchema {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    comment: 'This is the generic name of the grouping: e.g. league or conference or division',
  })
  genericGroupName: string;

  @Column('varchar', {
    nullable: true,
    comment: 'This short generic name gets used in space-constrained areas e.g. league or conf or div',
  })
  genericGroupNameShort: string;

  @Column('varchar', {
    nullable: true,
    comment: 'Some well known examples of where this group schema is in use.',
  })
  examples: string;

  @Column('varchar', {
    nullable: true,
  })
  description: string;

  @TreeChildren()
  children: GroupSchema[];

  @TreeParent()
  parent: GroupSchema;

  @TreeLevelColumn()
  level: number;
}
