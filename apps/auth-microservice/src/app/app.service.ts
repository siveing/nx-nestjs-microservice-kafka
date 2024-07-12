import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from "@nx-nestjs-microservices/shared/dto"
import { User } from "@nx-nestjs-microservices/shared/entity"
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AppService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService
    
  ) { }

  async createUser(data: CreateUserDto): Promise<void> {
    console.log("called createUser in auth Service ===", data);

    const decryptedText = await this.jwtService.decode(data.encryptedText);
    console.log("decryptedText ===", decryptedText);
    

    this.usersRepository.save(data);
  }

  getUser(id: number): User {
    return this.usersRepository.findOne(id);
  }
}
