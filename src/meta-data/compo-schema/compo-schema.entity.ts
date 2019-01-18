import { Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, TreeLevelColumn, Generated, ManyToOne, JoinColumn } from 'typeorm';
import { ScoreSchema } from '../score-schema/score-schema.entity';

/*
    A CompoSchema is a schema for a competition between two entities.
    For example a tennis match, a baseball game, a Davis Cup Tie.

    A competition is a tree because, like in the case of a team tennis,
    a competition between two teams is actually composed of several matches
    which are themselves competitions.

    Competition is the best generic term I could think of.  Depending on the
    league in question, a competition between two teams could be called a "game"
    (as in American soccer, baseball, football, hockey) a "match" (as in European
    soccer), a "tie" as in Davis Cup, a "fixture" and so on. Because of this,
    the Schema that governs the particular league has a field called compoName
    which determines the name that is used for a competition between two teams
    in that league.

    It is not 100% clear that I cannot merge the concepts of a compo schema
    and a scoring schema, but at this point I am keeping them apart. This does
    mean that I have to "roll-up" scores in a scoring schema and potentially
    do something very similar when I "roll-up" the scores from the children of
    a competition schema.  Something tells me that I am missing something here.
 */
@Entity()
@Tree('closure-table')
export class CompoSchema {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  // This should only be used at the leaf level.
  @ManyToOne(type => ScoreSchema, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'scoreSchemaId'})
  scoreSchema: ScoreSchema;

  @Column('varchar', {
    nullable: true,
    comment: 'The name used for this competitions schema.',
  })
  name: string;

  // For example, a single match has a roster size of 1, a doubles match has 2.
  // Some sports limit the number of players on the roster for any one game.
  // If sizes are specified, the GUI will enforce roster entry, otherwise
  // there are no "per compo" rosters and the team roster will be used.
  @Column('int', {
    nullable: true,
    comment: 'How many players are required on the roster for this como',
  })
  rosterMinSize: number;
  @Column('int', {
    nullable: true,
    comment: 'How many players are allowed on the roster for this como',
  })
  rosterMaxSize: number;

  @TreeChildren()
  children: CompoSchema[];

  @TreeParent()
  parent: CompoSchema;

  @TreeLevelColumn()
  level: number;
}
