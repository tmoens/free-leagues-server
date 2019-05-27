import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

/*
    Leagues are often organized into levels and at each level there are groupings
    of teams or groupings of groupings.  For example, the NHL has a League which
    is a grouping of Conferences which is a grouping of divisions which in turn
    are a grouping of teams.  SurDel girls soccer have many leagues, each has
    a single grouping of teams.

    GroupingSchemas are used to model these hierarchies along with the terminology
    specific to the League.  A GroupSchema for an NHL Conference would have a
    generic group name of "conference", It's parent group schema would be a
    "league" and its child would be a "division".

    The NHL League itself would have two groups governed by the "conference"
    GroupSchema and four groups governed by the "division" schema.

    If a GroupSchema is generic enough it can be reused in many different
    types of leagues.
 */

@Entity()
@Tree('closure-table')
export class GroupSchema {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    nullable: false,
  })
  name: string;

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
    comment: 'Some examples of where this group schema is in use.',
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
