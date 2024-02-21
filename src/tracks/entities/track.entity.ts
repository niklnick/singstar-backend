import { Album } from "src/albums/entities/album.entity";
import { Artist } from "src/artists/entities/artist.entity";
import { Genre } from "src/tracks/enums/genre.enum";
import { Language } from "src/tracks/enums/language.enum";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Track {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ name: 'cover_url' })
    coverUrl: string;

    @Column('enum', { array: true, enum: Genre })
    genres: Genre[];

    @Column('enum', { enum: Language })
    language: Language;

    @Column('interval')
    duration: string;

    @Column('date', { name: 'release_date' })
    releaseDate: Date;

    @ManyToOne(() => Artist, (artist: Artist) => artist.tracks)
    @JoinColumn({ name: 'artist_id' })
    artist: Artist;

    @ManyToOne(() => Album, (album: Album) => album.tracks)
    @JoinColumn({ name: 'album_id' })
    album: Album;

    @ManyToMany(() => Playlist, (playlist: Playlist) => playlist.tracks)
    playlists: Playlist[];
}
