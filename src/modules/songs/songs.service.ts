import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Song } from "./schemas/songs.schema";
import { Model } from "mongoose";

@Injectable()
export class SongsService {
    constructor(@InjectModel(Song.name) private songModel: Model<Song>){}

    async getSongs(): Promise<any> {
        const songs = await this.songModel.find({}).exec();
        return songs;
    }

    async uploadSong(body: any): Promise<any> {
        const song = new this.songModel(body);
        await song.save();
        return song;
    }
}