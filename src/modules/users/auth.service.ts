import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/auth.schema';
import { SignupDto, userDetails } from './dto/auth.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async registerAdmin(body : any): Promise<any> {
    const user = await this.userModel.create(body);
    return user;
  }

  jwtBuilder(data: userDetails): any {
    const payload = { userId: data._id, email: data.email, role : data.role };
    const accessToken = jwt.sign(payload, 'CMXsaDC2022', { expiresIn: '1h' });
    const refreshToken = jwt.sign({id : data._id}, 'CMXsaDC2022', { expiresIn: '24h' });
    return { accessToken, refreshToken };
  }
  async signup(signupDto: SignupDto): Promise<any> {
    const { email, name, role } = signupDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const user = await this.userModel.create(signupDto);
    let tokens = this.jwtBuilder(user);
    return {  ...tokens, email, name, role };
  }

  async signin(req: any): Promise<any> {
    let user:userDetails  = req.user;
    let tokens = this.jwtBuilder(user);
    return { ...tokens, email : user.email, name: user.name, role : user.role };
  }

  async checkPassword(password: string, dbPassword : string): Promise<boolean> {
    return bcrypt.compare(password, dbPassword);
  }

  async validateUser(email : string, password : string) : Promise<any> {
    let user:userDetails = await this.userModel.findOne({ email } );
    const isPasswordValid = await this.checkPassword(password, user.password);
    if (!isPasswordValid) {
      return {
        status: 401,
        user: {},
        message: "Invalid email or password"
      };
    } else {
      return {
        status: 200,
        user: user,
        message: "User found"
      };
    }
  }
}
