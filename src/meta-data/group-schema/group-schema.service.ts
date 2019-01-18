import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { GroupSchemaRepository } from './group-schema.repository';

@Injectable()
export class GroupSchemaService {
  constructor(
    @InjectRepository(GroupSchemaRepository)
    private readonly repo: GroupSchemaRepository,
  ) {}

}
