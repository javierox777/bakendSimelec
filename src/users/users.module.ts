import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Users, UsersSchema } from './model/user.model';

@Module({
  imports :[MongooseModule.forFeature([{name:Users.name, schema:UsersSchema}])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
