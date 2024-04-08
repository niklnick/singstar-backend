import { Album } from "src/albums/entities/album.entity";
import { Artist } from "src/artists/entities/artist.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { Genre } from "src/tracks/enums/genre.enum";
import { Language } from "src/tracks/enums/language.enum";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Track {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ name: 'cover_url', nullable: true })
    coverUrl?: string | null;

    @Column('enum', { array: true, enum: Genre })
    genres: Genre[];

    @Column('enum', { enum: Language })
    language: Language;

    @Column({ default: false })
    explicit: boolean;

    @Column('interval')
    duration: string;

    @Column('date', { name: 'release_date' })
    releaseDate: Date;

    @ManyToOne(() => Album, (album: Album) => album.tracks)
    @JoinColumn({ name: 'album_id' })
    album?: Album | null;

    @ManyToOne(() => Artist, (artist: Artist) => artist.tracks, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'artist_id' })
    artist: Artist;

    @ManyToMany(() => Artist, (artist: Artist) => artist.featuredTracks)
    @JoinTable({
        name: 'track_artist_feature',
        joinColumn: { name: 'track_id' },
        inverseJoinColumn: { name: 'artist_id' }
    })
    featuredArtists: Artist[];

    @ManyToMany(() => Playlist, (playlist: Playlist) => playlist.tracks)
    playlists: Playlist[];
}
