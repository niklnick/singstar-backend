import { Album } from "src/albums/entities/album.entity";
import { Artist } from "src/artists/entities/artist.entity";
import { Track } from "src/tracks/entities/track.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    username: string;

    @ManyToMany(() => Artist)
    @JoinTable({
        name: 'user_artist_favourite',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'artist_id' }
    })
    favouriteArtists: Artist[];

    @ManyToMany(() => Album)
    @JoinTable({
        name: 'user_album_favourite',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'album_id' }
    })
    favouriteAlbums: Album[];

    @ManyToMany(() => Track)
    @JoinTable({
        name: 'user_track_favourite',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'track_id' }
    })
    favouriteTracks: Track[];
}
