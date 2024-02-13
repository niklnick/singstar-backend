import { Genre } from "src/enums/genre.enum";
import { Language } from "src/enums/language.enum";

export class QueryTrackDto {
    readonly title?: string;
    readonly genres?: Genre[];
    readonly language?: Language;
}
