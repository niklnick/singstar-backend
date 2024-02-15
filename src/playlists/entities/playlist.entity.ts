import { Track } from "src/tracks/entities/track.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Playlist {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    title: string;

    @CreateDateColumn()
    createDate: Date;

    @ManyToOne(() => User, (user: User) => user.createdPlaylists)
    creator: User;

    @ManyToMany(() => Track, (track: Track) => track.playlists)
    @JoinTable({
        name: 'playlist_track',
        joinColumn: { name: 'playlist_id' },
        inverseJoinColumn: { name: 'track_id' }
    })
    tracks: Track[];
}
