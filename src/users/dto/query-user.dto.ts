export class QueryUserDto {
    relations?: {
        favoriteArtists?: boolean;
        favoriteAlbums?: boolean;
        favoriteTracks?: boolean;
        favoritePlaylists?: boolean;
    };
}
