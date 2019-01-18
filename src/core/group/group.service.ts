import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {GroupSchema} from './group-schema.entity';
import {getLogger} from 'log4js';
import { GroupRepository } from './group-schema.repository';

const logger = getLogger('groupSchema');

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private readonly repo: GroupRepository,
  ) {}

  async findAll(): Promise<GroupSchema[]> {
    return await this.repo.find();
  }
}
