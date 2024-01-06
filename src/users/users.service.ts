import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Users, UsersDocument} from './model/user.model'
import {Model} from 'mongoose'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private userModel: Model<UsersDocument> ){}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async signup(createUserDto: CreateUserDto) {
     const {userName , email, password, role} = createUserDto

     const userExist =await this.userModel.findOne({email:email})
     console.log(userExist)

     if(userExist) {
      return "email, already exists"
     }

     if(password.length <= 7){
      return "password has to be at least 8 characters long"
     }

     const newUser = new this.userModel({userName, role, password, email})
     newUser.password = await bcrypt.hash(password, 10)
     await newUser.save()
     newUser.password= undefined
     return {
      message:"success",
      body: newUser
     }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
