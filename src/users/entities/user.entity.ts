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

    @Column({ select: false })
    password: string;

    @OneToMany(() => Playlist, (playlist: Playlist) => playlist.creator)
    createdPlaylists: Playlist[];

    @ManyToMany(() => Artist)
    @JoinTable({
        name: 'user_artist_like',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'artist_id' }
    })
    likedArtists: Artist[];

    @ManyToMany(() => Album)
    @JoinTable({
        name: 'user_album_like',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'album_id' }
    })
    likedAlbums: Album[];

    @ManyToMany(() => Track)
    @JoinTable({
        name: 'user_track_like',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'track_id' }
    })
    likedTracks: Track[];

    @ManyToMany(() => Playlist)
    @JoinTable({
        name: 'user_playlist_like',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'playlist_id' }
    })
    likedPlaylists: Playlist[];
}
