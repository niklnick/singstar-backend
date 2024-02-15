import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { TypeormConfigService } from './config/typeorm-config.service';
import { PlaylistsModule } from './playlists/playlists.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

const routes: Routes = [
    {
        path: 'artists',
        module: ArtistsModule
    },
    {
        path: 'albums',
        module: AlbumsModule
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
        ConfigModule.forRoot({ isGlobal: true }),
        RouterModule.register(routes),
        TypeOrmModule.forRootAsync({ useClass: TypeormConfigService }),
        AlbumsModule,
        ArtistsModule,
        PlaylistsModule,
        TracksModule,
        UsersModule
    ]
})
export class AppModule { }
