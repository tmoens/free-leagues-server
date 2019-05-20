import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, Index } from 'typeorm';
import { Exclude } from 'class-transformer';

/*
    An "External Organization" is an external organization that has player
    identifiers that can be mapped to FreeLeagues players.

    We intentionally do not keep much information about external organizations.
    At some point in the future perhaps we will have information about a public
    API for fetching information.
 */
@Entity()
export class ExternalOrg {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({
    nullable: false,
  })
  name: string;

  @Column('varchar', {
    nullable: true,
    comment: 'This short name gets used in space-constrained areas',
  })
  nameShort: string;

  @Column('varchar', {
    nullable: true,
  })
  url: string;

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
