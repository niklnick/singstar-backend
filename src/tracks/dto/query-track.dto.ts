import { Genre } from "src/tracks/enums/genre.enum";
import { Language } from "src/tracks/enums/language.enum";

export class QueryTrackDto {
    readonly title?: string;
    readonly genres?: Genre[];
    readonly language?: Language;
}
