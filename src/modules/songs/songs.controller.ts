import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { SongsService } from "./songs.service";

@Controller('songs')
export class SongController {
    constructor(private readonly songService: SongsService) {}

    @Post('upload')
    async uploadSong(@Body() body: any) {
        try {
            return await this.songService.uploadSong(body);
        }
        catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get()
    async getSong() {
        try {
            return await this.songService.getSongs();
        }
        catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}