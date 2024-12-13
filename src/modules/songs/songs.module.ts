import { Module } from "@nestjs/common";
import { SongsService } from "./songs.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Song, SongSchema } from "./schemas/songs.schema";
import { SongController } from "./songs.controller";

@Module({
    imports : [MongooseModule.forFeature([{name : Song.name, schema : SongSchema}])],
    controllers : [SongController],
    providers: [SongsService],
    exports : [MongooseModule],
})

export class SongsModule {}