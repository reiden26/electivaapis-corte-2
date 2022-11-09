import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MD5 } from 'crypto-js'; 


@Injectable()
export class UsersService {


  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async create(createUserDto: CreateUserDto) {
    const userExits = await this.findOneByEmail(createUserDto.email);
    if (userExits){
      throw new BadRequestException('Email ya existe');
    }
    const newUser = Object.assign({}, createUserDto); 
    newUser.password = MD5(newUser.password).toString();
    return this.userRepo.save(newUser);

  }

  async findOneByEmail(email: String){
    return this.userRepo.findOneBy({ email });
  }
  }
  