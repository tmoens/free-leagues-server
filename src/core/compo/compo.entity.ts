import { Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent,
  TreeLevelColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { CompoSchema } from '../../meta-data/compo-schema/compo-schema.entity';
import { ScoreSchema } from '../../meta-data/score-schema/score-schema.entity';
import { Score } from '../score/score.entity';
import { CompoPlayer } from './compo-player/compo-player.entity';
import { TeamIncarnation } from '../team/team-incarnation/team-incarnation.entity';

/*
    A "Compo" is the super-generic name for a single competition between two sides.
    Every League gets to customize the name to whatever they like: game; match;
    fixture; tie; meet; meet-up; competition - whatever.

    A competition can be a nested group of competitions governed by the
    competition schema for the particular group (e.g. league or division)
    competition format.

    At the leaf level a competition will have a scoringSchema.

    It wil also have a "TDB" schema which describes how scores are rolled
    up into points and other things used to compute standings.

    In simple leagues compos will be games (with a scoring format) and
    wins, losses and ties will be worth some number of points in the roll-up.

    In complicated things like tennis leagues, a compo may be composed of
    of several other compos (in the CompetitionSchema) like First Singles,
    Second Singles, Men's Doubles and Mixed Doubles.  Points may be rolled
    based on some function of matches won and sets won.
 */
@Entity()
@Tree('closure-table')
export class Compo {

  @PrimaryGeneratedColumn()
  id: number;

  // One of the two teams
  @ManyToOne(type => TeamIncarnation, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  side1: TeamIncarnation;

  // The other team
  @ManyToOne(type => TeamIncarnation, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  side2: TeamIncarnation;

  // Governs the structure of the competition
  @ManyToOne(type => CompoSchema, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'compoSchemaId'})
  compoSchema: CompoSchema;

  // Governs the scoring format of the competition - only interesting at the
  // the leaf level.
  @ManyToOne(type => ScoreSchema, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'scoreSchemaId'})
  scoreSchema: ScoreSchema;

  // The "score" of the compo.  Probably only interesting at the leaf level.
  @OneToOne(type => Score, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'scoreId'})
  score: Score;

  // If the CompoSchema says there is a compo roster, we save it.
  @OneToMany(type => CompoPlayer, compoPlayers => compoPlayers.compo, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  roster: CompoPlayer[];

  // TODO "Roll-up" schema - how to build standings data from children and/or scores

  // TODO want an enum here?
  @Column('varchar', {
    comment: 'The status of the compo - whether or not the match is complete',
  })
  status: string;

  @Column('datetime', {
    nullable: true,
    comment: 'The scheduled date for the compo only interesting at top level',
  })
  scheduledDate: Date;

  @Column('datetime', {
    nullable: true,
    comment: 'The completion date for the compo only interesting at top level',
  })
  completionDate: Date;

  @TreeChildren()
  children: Compo[];

  @TreeParent()
  parent: Compo;

  @TreeLevelColumn()
  level: number;
}
