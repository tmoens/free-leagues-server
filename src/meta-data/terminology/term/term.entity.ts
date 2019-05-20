import { Entity, Column, PrimaryColumn } from 'typeorm';
/*
    Some terms used in the user interface vary from sport to sport and
    league to league. For example a competition between two sides is called
    a game in American soccer but a match in English football. A match in
    a regular tennis tournament, but a "tie" in Davis Cup.

    Leagues, and sports will have their own lexicons which override generic
    terminology in their own contexts.

    A "term" here is used to mean any generic term that is used in the
    user interface and that may be overridden in a particular context.

    Term identifiers are all prefixed with __ and __ so that in any given string
    in the user interface, the contextually correct term is used.

    Note that the description for a term is itself going to be used in the user
    interfac and thus, where the description of one term refers to another term,
    the description itself must use the _termid_ notation.

    There is a "vocabulary" table that says which terms can be overridden in
    which contexts.  For example that the __compo_name__ term can be overridden
    at the sport level ("match" for Tennis and "game" for baseball) and further
    overridden at the league level (e.g. "tie" for the Davis Cup).

    This all allows a nice data-driven user interface that can be used to
    customize the user interface terminology for specific sports or leagues,
    but also to extend the terminology when necessary by simply adding meta-data
    for terms and vocabularies.
 */

@Entity()
export class Term {

  @PrimaryColumn()
  id: string;

  @Column('varchar', {
    length: 2000,
    nullable: true,
  })
  description: string;

  @Column('varchar', {
    nullable: false,
  })
  default: string;

  @Column('varchar', {
    length: 2000,
    nullable: true,
  })
  examples: string;
}
