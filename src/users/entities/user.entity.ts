import { Album } from "src/albums/entities/album.entity";
import { Artist } from "src/artists/entities/artist.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { Track } from "src/tracks/entities/track.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @OneToMany(() => Playlist, (playlist: Playlist) => playlist.creator)
    createdPlaylists: Playlist[];

    @ManyToMany(() => Artist)
    @JoinTable({
        name: 'user_artist_favorite',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'artist_id' }
    })
    favoriteArtists: Artist[];

    @ManyToMany(() => Album)
    @JoinTable({
        name: 'user_album_favorite',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'album_id' }
    })
    favoriteAlbums: Album[];

    @ManyToMany(() => Track)
    @JoinTable({
        name: 'user_track_favorite',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'track_id' }
    })
    favoriteTracks: Track[];

    @ManyToMany(() => Playlist)
    @JoinTable({
        name: 'user_playlist_favorite',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'playlist_id' }
    })
    favoritePlaylists: Playlist[];
}
