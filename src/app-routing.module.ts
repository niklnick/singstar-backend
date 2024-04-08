import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { AlbumsModule } from "./albums/albums.module";
import { ArtistsModule } from "./artists/artists.module";
import { AuthModule } from "./auth/auth.module";
import { PlaylistsModule } from "./playlists/playlists.module";
import { TracksModule } from "./tracks/tracks.module";
import { UsersModule } from "./users/users.module";

const routes: Routes = [
    {
        path: 'albums',
        module: AlbumsModule
    },
    {
        path: 'artists',
        module: ArtistsModule
    },
    {
        path: 'auth',
        module: AuthModule
    },
    {
        path: 'playlists',
        module: PlaylistsModule
    },
    {
        path: 'tracks',
        module: TracksModule
    },
    {
        path: 'users',
        module: UsersModule
    }
];

@Module({
    imports: [
        RouterModule.register(routes),
        AlbumsModule,
        ArtistsModule,
        AuthModule,
        PlaylistsModule,
        TracksModule,
        UsersModule
    ]
})
export class AppRoutingModule { }
