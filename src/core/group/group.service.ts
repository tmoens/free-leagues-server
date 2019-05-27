import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {getLogger} from 'log4js';
import { GroupRepository } from './group.repository';
import { Group } from './group.entity';

const logger = getLogger('groupSchema');

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private readonly repo: GroupRepository,
  ) {}

  async findAll(): Promise<Group[]> {
    return await this.repo.find();
  }
}
