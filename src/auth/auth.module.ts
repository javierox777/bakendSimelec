import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Users, UsersSchema } from '../users/model/user.model';

@Module({
  imports :[MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
