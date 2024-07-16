import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@core/shared/entity';
import { Repository } from 'typeorm';
import { FilterUsersDto, ValidateUserDto, UpdateUserDto } from '../dto/user.dto';
import { CreateUserDto } from '@core/shared/dto';

const USERS = [1, 2, 3];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) { }

  findByEmail(email: User['email']) {
    return this.usersRepo.findOneBy({ email });
  }

  findById(id: User['id']) {
    return this.usersRepo.findOneByOrFail({ id });
  }

  getAll(params: FilterUsersDto) {
    const { limit } = params;
    if (limit) {
      return this.usersRepo.find({ take: limit });
    }
    return this.usersRepo.find();
  }

  async isAvailable(dto: ValidateUserDto) {
    let isAvailable = false;
    if (dto.email) {
      isAvailable = (await this.findByEmail(dto.email)) === undefined;
    }
    return { isAvailable };
  }

  create(dto: CreateUserDto) {
    const newUser = this.usersRepo.create(dto);
    return this.usersRepo.save(newUser);
  }

  async update(id: User['id'], changes: UpdateUserDto) {
    if (USERS.some((userId) => userId === id)) {
      throw new UnauthorizedException(
        'This user is not available for updating; instead, create your own user to update.',
      );
    }
    const user = await this.findById(id);
    this.usersRepo.merge(user, changes);
    return this.usersRepo.save(user);
  }

  async delete(id: number) {
    if (USERS.some((userId) => userId === id)) {
      throw new UnauthorizedException(
        'This user is not available for deleting; instead, create your own user to delete.',
      );
    }
    const user = await this.findById(id);
    await this.usersRepo.delete({ id: user.id });
    return true;
  }
}
