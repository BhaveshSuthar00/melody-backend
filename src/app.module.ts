import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasicAuthMiddleware } from './middleware/basic-auth.middleware';
import { BearerAuthMiddleware } from './middleware/bearer-auth.middleware';
import { AuthController } from './modules/users/auth.controller';
import { AuthService } from './modules/users/auth.service';
import { AuthModule } from './modules/users/auth.module';
import { SongsService } from './modules/songs/songs.service';
import { SongController } from './modules/songs/songs.controller';
import { SongsModule } from './modules/songs/songs.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://bhavesh:CljuhC8YgFIcWCrs@cluster0.vxlup.mongodb.net/soundCloud?retryWrites=true&w=majority'), AuthModule, SongsModule, JwtModule.register({secret: 'CMXsaDC2022'})],
  controllers: [AuthController, SongController],
  providers: [BearerAuthMiddleware, BasicAuthMiddleware, AuthService, SongsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply Basic Auth for specific routes
    consumer
        .apply(BasicAuthMiddleware)
        .forRoutes(
            // { path: 'user/register', method: RequestMethod.POST },
            { path: 'auth/signin', method: RequestMethod.POST }
        );

    // Apply Bearer Auth for specific routes
    consumer
        .apply(BearerAuthMiddleware)
        .forRoutes(
            { path: 'songs/all', method: RequestMethod.GET },
            { path: 'playlist', method: RequestMethod.POST }
        );
  }
}


