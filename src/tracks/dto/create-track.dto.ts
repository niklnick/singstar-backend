import { Genre } from "src/tracks/enums/genre.enum";
import { Language } from "src/tracks/enums/language.enum";

export class CreateTrackDto {
    readonly title: string;
    readonly coverUrl?: string;
    readonly genres: Genre[];
    readonly language: Language;
    readonly explicit?: boolean;
    readonly duration: string;
    readonly releaseDate: Date;
    readonly album?: { readonly id: string; };
    readonly artist: { readonly id: string; };
    readonly featuredArtists?: { readonly id: string; }[];
}
