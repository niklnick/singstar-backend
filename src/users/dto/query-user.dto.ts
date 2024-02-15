export class QueryUserDto {
    relations?: {
        favoriteAlbums?: boolean;
        favoriteArtists?: boolean;
        favoritePlaylists?: boolean;
        favoriteTracks?: boolean;
    };
}
