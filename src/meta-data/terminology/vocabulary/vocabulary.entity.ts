import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { Term } from '../term/term.entity';
/*
    A vocabulary is some set of generic "terms" that are applicable to a
    specific user context.  For example, in the context of a particular "event",
    the generic term for "the thing where two sides play each other" could be a
    called a "match", but in a different "event" the same concept could be
    called a "game".
 */

@Entity()
export class Vocabulary {

  @PrimaryColumn()
  id: string;

  @Column('varchar', {
    length: 2000,
    nullable: true,
  })
  description: string;

  @ManyToMany(type => Term, {
    eager: true,
  })
  @JoinTable()
  terms: Term[];
}
