export class CreatePlaylistDto {
    readonly title: string;
    readonly creator: { readonly id: string; };
    readonly tracks: { readonly id: string; }[];
}
