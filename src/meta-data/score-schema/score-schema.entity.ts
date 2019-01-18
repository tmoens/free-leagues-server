import { Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, TreeLevelColumn, Generated } from 'typeorm';

/*
    Because scoring in different sports is wildly varied, we need a generic
    way to describe the form of a score.  Enter the ScoreSchema.

    This method covers an awful lot of scoring formats, but undoubtedly
    it will need more work.

    Scores can be composite and hierarchical so we are using a Tree entity.
    Take the example of a tennis match that is built from sets which
    themselves have a game score and a tiebreaker score.  And if you
    really wanted, you could also have point scores within the game.

    TODO - associated sport (e.g. Tennis), associated organization (e.g. BCDS)
    TODO tiebreaker schema. Many of me to one of them.
    TODO Forfeiture schema.

 */
@Entity()
@Tree('closure-table')
export class ScoreSchema {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    comment: 'This is the name of this scoreSchema',
  })
  name: string;

  @Column('varchar', {
    nullable: true,
  })
  description: string;

  @Column('varchar', {
    comment: 'What are we scoring? points? games? sets? goals? holes? wins?',
  })
  units: string;

  @Column('int', {
    nullable: true,
    comment: 'If win is defined by on side reaching a certain number first.',
  })
  firstTo: number;

  @Column('int', {
    nullable: true,
    comment: 'It the winner is required to have a particular margin of victory.',
  })
  winBy: number;

  @Column('int', {
    nullable: true,
    comment: 'If there is a specific point at which a tie is broken e.g. 6 (all) in a tennis set.',
  })
  tiebreakerAt: number;

  @Column('tinyint', {
    default: true,
    comment: 'Whether or not partial scores are ok - e.g. in case of mid-match retirement or suspension of play',
  })
  partialScoresOk: boolean;

  @Column('tinyint', {
    default: true,
    comment: 'Whether or not the final score can be a tie.',
  })
  tiesAllowed: boolean;

  @TreeChildren()
  children: ScoreSchema[];

  @TreeParent()
  parent: ScoreSchema;

  @TreeLevelColumn()
  level: number;
}
