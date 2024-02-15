import { Genre } from "src/enums/genre.enum";

export class CreateAlbumDto {
    readonly title: string;
    readonly coverUrl: string;
    readonly genres: Genre[];
    readonly releaseDate: string;
    readonly artist: {
        readonly id: string;
    };
}
