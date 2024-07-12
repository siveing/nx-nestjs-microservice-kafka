// apps/auth-microservice/src/app/users.repository.ts

import { Injectable } from '@nestjs/common';
import { User } from '@nx-nestjs-microservices/shared/entity';

@Injectable()
export class UsersRepository {
    private readonly users: User[] = [];

    save(user: User) {
        this.users.push({ ...user, id: this.users.length + 1 });
    }

    findOne(id: number) {
        return this.users.find((u) => u.id === id) || null;
    }
}