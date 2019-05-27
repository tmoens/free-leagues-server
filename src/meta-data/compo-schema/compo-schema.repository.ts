import { EntityRepository, TreeRepository } from 'typeorm';
import { getLogger } from 'log4js';
import { CompoSchema } from './compo-schema.entity';

const logger = getLogger('compoSchema');

@EntityRepository(CompoSchema)
export class CompoSchemaRepository extends TreeRepository<CompoSchema> {

}