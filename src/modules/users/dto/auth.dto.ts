import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  role : string;

}

export class SigninDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class userDetails {
  @IsNotEmpty()
  _id: any;
  
  @IsEmail()
  email : string; 

  @IsNotEmpty()
  password : string; 
  
  name : string;

  @IsNotEmpty()
  role : string;
}