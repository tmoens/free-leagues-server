import { Entity, Tree, Column, PrimaryGeneratedColumn,
  TreeChildren, TreeParent, TreeLevelColumn,
  ManyToOne, JoinColumn } from 'typeorm';
import { ScoreSchema } from '../../meta-data/score-schema/score-schema.entity';

/*
   For now, I am going to model a score as a tree only having values at the leaves
   corresponding to leaf ScoreSchemas.  Everything above that is rolled up
   when needed.

   In theory this would allow you re-run entire leagues with a new point
   roll-up schema.

   This implies that a score is either a pair of numbers or a set of children
   as governed by the associated score schema. But we have to come back to this
   because of the situation illustrated by the two examples below.

   But if you look at the case of a tiebreak set in tennis, you have some
   redundant information in that the game score is 7-6 AND there is a tiebreaker
   score governed byt he tiebreaker schema as well.

   Same in NHL hockey where the score may be 4-3 but there may be a tiebreaker
   (overtime or shootout) as well.
 */

@Entity()
@Tree('closure-table')
export class Score {

  // UUIDs are too expensive here.
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => ScoreSchema, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'scoreSchemaId'})
  scoreSchema: ScoreSchema;

  @Column()
  score1: number;

  @Column()
  score2: number;

  @TreeChildren()
  children: Score[];

  @TreeParent()
  parent: Score;

  @TreeLevelColumn()
  level: number;
}
