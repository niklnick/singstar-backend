export class CreateAlbumDto {
    readonly title: string;
    readonly coverUrl: string;
    readonly releaseDate: string;
    readonly artist: { readonly id: string; };
}
