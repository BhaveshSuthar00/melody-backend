import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/modules/users/auth.service';
@Injectable()
export class BasicAuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const authorizationHeader = req.headers.authorization;
        
        if (!authorizationHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const base64Credentials = authorizationHeader.split(' ')[1];
        const [email, password] = Buffer.from(base64Credentials, 'base64').toString().split(':');

        if (!email || !password) {
            return res.status(400).json({ message: 'Invalid credentials format' });
        }

        try {
            const validateUser:any = await this.authService.validateUser(email, password);
            if (validateUser.status == 401) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            console.log(validateUser.user);
            req['user'] = validateUser.user;  // Attaching user details to the request object
            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Server error', error });
        }
    }
}
