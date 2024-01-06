import {IsEmail, MinLength, isString, IsOptional} from 'class-validator'



export class CreateUserDto {
   @IsOptional()
   userName : string
   @IsEmail()
   email : string
   password : string
   role : string

}
