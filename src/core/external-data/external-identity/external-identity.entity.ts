import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Person } from '../../person/person.entity';
import { ExternalOrg } from '../external-org/external-org.entity';

/*
    An "External Identity" is just a map from an person's identifier in an external organization
    to a FreeLeagues person.

    So, for example, there would be one record mapping FreLeagues player Ted Moens to a PDGA
    membership Id and another mapping Ted Moens to a Tennis Canada Membership Id.
 */
@Entity()
export class ExternalIdentity {

  @PrimaryColumn('varchar', { length: 255 })
  @ManyToOne(type => ExternalOrg, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'externalOrgId'})
  externalOrg: ExternalOrg;

  @Column()
  externalId: string;

  @ManyToOne(type => Person, internalId => internalId.externalIdentities, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'internalId'})
  person: Person;
}
