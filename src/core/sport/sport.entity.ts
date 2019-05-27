import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, VersionColumn, Index } from 'typeorm';
import { CompoSchema } from '../../meta-data/compo-schema/compo-schema.entity';
import { ExternalOrg } from '../external-data/external-org/external-org.entity';
import { Exclude, Type } from 'class-transformer';

/*
    A "Sport" is just a place where we collect general terminology
    and concepts about a given sport.  This allows us to produce
    a sport-specific GUI that is "data-driven".
 */
@Entity()
export class Sport {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({nullable: false})
  name: string;

  @Column('varchar', {
    nullable: true,
    length: 2000,
  })
  description: string;

  // This is the default compo used for this sport.
  // For example, in tennis, it would be a 2 out of 3 set tennis match and
  // in baseball it would be a baseball game.
  @ManyToOne(type => CompoSchema, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  compo: CompoSchema;

  // Governing body for the sport
  @Type(() => ExternalOrg)
  @ManyToOne(type => ExternalOrg, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  governingBody: ExternalOrg;

  @Column('simple-json', {
    nullable: true,
    default: '{}',
  })
  lexicon: object;

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
