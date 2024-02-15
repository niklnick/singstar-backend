import { Genre } from "src/enums/genre.enum";
import { Language } from "src/enums/language.enum";

export class CreateTrackDto {
    readonly title: string;
    readonly coverUrl: string;
    readonly genres: Genre[];
    readonly language: Language;
    readonly duration: string;
    readonly releaseDate: Date;
    readonly artist: {
        readonly id: string;
    };
    readonly album: {
        readonly id: string;
    };
}
