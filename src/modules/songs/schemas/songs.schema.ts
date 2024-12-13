import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class Song extends Document {
    @Prop()
    name: string;

    @Prop()
    singer: string;

    @Prop()
    coverImg: string;

    @Prop()
    musicSrc: string;

    @Prop()
    category: string;

    @Prop()
    playlist: string[]
}

export const SongSchema = SchemaFactory.createForClass(Song);