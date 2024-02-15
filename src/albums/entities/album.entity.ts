import { Artist } from "src/artists/entities/artist.entity";
import { Track } from "src/tracks/entities/track.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Album {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ name: 'cover_url' })
    coverUrl: string;

    @Column('date', { name: 'release_date' })
    releaseDate: Date;

    @ManyToOne(() => Artist, (artist: Artist) => artist.albums)
    @JoinColumn({ name: 'artist_id' })
    artist: Artist;

    @OneToMany(() => Track, (track: Track) => track.album)
    tracks: Track[];
}
