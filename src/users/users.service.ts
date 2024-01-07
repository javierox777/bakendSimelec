import { Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './model/user.model'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Response } from 'express'

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private userModel: Model<UsersDocument>) { }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async signup(createUserDto: CreateUserDto, res: Response) {
    const { userName, email, password, role } = createUserDto
    try {
      const userExist = await this.userModel.findOne({ email: email })

      if (userExist) {
        return res.status(400).json({ message: 'Email, already exists' });

      }

      if (password.length <= 7) {
        return res.status(400).json({ message: 'password has to be at least 8 characters long' });
      }

      const newUser = new this.userModel({ userName, role, password, email })
      newUser.password = await bcrypt.hash(password, 10)
      await newUser.save()
      newUser.password = undefined
      return res.status(200).json({
        message: "success",
        body: newUser
      })

    } catch (error) {
      return { error }
    }
  }
  async signin(createUserDto: CreateUserDto, res: Response) {
    const { email, password } = createUserDto
    try {
      const emailExists = await this.userModel.findOne({ email: email })
      if (!emailExists) {
        return res.status(400).json({ message: 'Email or password incorrect' });
      }

      const match = await bcrypt.compare(password, emailExists.password)
      if (!match) {
        return res.status(400).json({ message: 'Email or password incorrect' });
      }

      const token = jwt.sign({
        _id: emailExists._id,
        isAdmin: emailExists.role,
        name: emailExists.userName,
        email: emailExists.email,

      }, 'caca')

      return res.status(200).json({ message: 'success', body: token });

    } catch (error) {
      return res.status(500).json({ message: error });
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
