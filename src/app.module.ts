import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { AuthModule } from './auth/auth.module';
import { TypeormConfigService } from './config/typeorm-config.service';
import { PlaylistsModule } from './playlists/playlists.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

const routes: Routes = [
    {
        path: 'auth',
        module: AuthModule
    },
    {
        path: 'users',
        module: UsersModule
    },
    {
        path: 'artists',
        module: ArtistsModule
    },
    {
        path: 'albums',
        module: AlbumsModule
    },
    {
        path: 'tracks',
        module: TracksModule
    },
    {
        path: 'playlists',
        module: PlaylistsModule
    }
];

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        RouterModule.register(routes),
        TypeOrmModule.forRootAsync({ useClass: TypeormConfigService }),
        AlbumsModule,
        ArtistsModule,
        AuthModule,
        PlaylistsModule,
        TracksModule,
        UsersModule
    ]
})
export class AppModule { }
