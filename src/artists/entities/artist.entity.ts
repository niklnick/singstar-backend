import { Album } from "src/albums/entities/album.entity";
import { Track } from "src/tracks/entities/track.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artist {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ name: 'avater_url' })
    avatarUrl: string;

    @OneToMany(() => Album, (album: Album) => album.artist)
    albums: Album[];

    @OneToMany(() => Track, (track: Track) => track.artist)
    tracks: Track[];
}
