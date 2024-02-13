import { Genre } from "src/enums/genre.enum";

export class QueryAlbumDto {
    readonly title?: string;
    readonly genres?: Genre[];
}
