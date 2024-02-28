export class QueryUserDto {
    relations?: {
        likedArtists?: boolean;
        likedAlbums?: boolean;
        likedTracks?: boolean;
        likedPlaylists?: boolean;
    };
}
