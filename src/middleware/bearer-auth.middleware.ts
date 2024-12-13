import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';  // Ensure JwtService is imported and available

@Injectable()
export class BearerAuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const authorizationHeader = req.headers['authorization'];
        
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authorizationHeader.split(' ')[1];

        try {
            const decoded = await this.jwtService.verifyAsync(token);
            req['user'] = decoded;  // Attaching user details to the request object
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token', error });
        }
    }
}
