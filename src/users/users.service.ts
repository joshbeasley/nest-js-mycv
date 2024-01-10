import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  create(email: string, password: string){
    const user = this.repo.create({email, password})

    return this.repo.save(user)
  }

  // findOne(id: number){
  //   return this.usersRepository.findOneBy({ id })
  // }

  // find(email: string){
  //   return this.usersRepository.findBy({ email })
  // }

  // update(body: CreateUserDto){
  //   this.usersRepository.update()
  // }

  remove(){}
}
