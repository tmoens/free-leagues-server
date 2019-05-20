import {
  Entity, Tree, Column, PrimaryGeneratedColumn,
  TreeChildren, TreeParent,
  CreateDateColumn, UpdateDateColumn, VersionColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

/*
    An "Organization" is just some entity that we support to provide
    tournament/leagues services.

    This is done to limit the visibility of different groups to different
    items in the database.  So the "New Orleans Minor Lacrosse League" will
    not even know about the "Frankfurt Over 60 Badminton League".  Nor, for
    that matter will the administrators of one be able to make changes in the
    other's leagues.

    Organizations can be hierarchical with higher levels having visibility
    of the lower. Supports things like PDGA -> PDGA Canada -> BCDS -> Langley
    Disc Golf Club type of hierarchies.

    Lower levels may have access to some resources provided by their parents.
    for example, the Pacific Northwest Tennis Association should be able to
    see the schemas set up by the USTA.

    Also I need to work out sharing resources laterally between organizations
    within an organization as well as between organizations outside of an
    organization.

    But that is all for another day.  As long as we associate an organization
    with things like a League, we will be able to do some significant work
    with end user visibility of data.

    Notes: The @Exclude decorations are used to tell the class-transformer
    to ignore fields when transforming the class to a simple object to send
    to the client.
 */
@Entity()
@Tree('closure-table')
export class Org {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('varchar', {
    nullable: true,
    comment: 'This short name gets used in space-constrained areas',
  })
  nameShort: string;

  // TODO lots of other fields like contacts, website, and so on.

  // TODO state of the affiliation with FreeLeagues

  // TODO affiliated organizations to facilitate sharing.

  // TODO per organization customizable data fields.

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @VersionColumn()
  @Exclude()
  version: number;

  @TreeChildren()
  children: Org[];

  @TreeParent()
  parent: Org;
}
