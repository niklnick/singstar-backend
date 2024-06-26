import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Playlist } from 'src/playlists/entities/playlist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Body() query: QueryUserDto): Promise<User> {
    return await this.usersService.findOne(id, query);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<User> {
    return await this.usersService.remove(id);
  }

  @Post(':id/albums/:album_id')
  @UseGuards(AuthGuard)
  async likeAlbum(@Param('id') id: string, @Param('album_id') albumId: string): Promise<Album[]> {
    return await this.usersService.likeAlbum(id, albumId);
  }

  @Delete(':id/albums/:album_id')
  @UseGuards(AuthGuard)
  async unlikeAlbum(@Param('id') id: string, @Param('album_id') albumId: string): Promise<Album[]> {
    return await this.usersService.unlikeAlbum(id, albumId);
  }

  @Post(':id/artists/:artist_id')
  @UseGuards(AuthGuard)
  async likeArtist(@Param('id') id: string, @Param('artist_id') artistId: string): Promise<Artist[]> {
    return await this.usersService.likeArtist(id, artistId);
  }

  @Delete(':id/artists/:artist_id')
  @UseGuards(AuthGuard)
  async unlikeArtist(@Param('id') id: string, @Param('artist_id') artistId: string): Promise<Artist[]> {
    return await this.usersService.unlikeArtist(id, artistId);
  }

  @Post(':id/playlists/:playlist_id')
  @UseGuards(AuthGuard)
  async likePlaylist(@Param('id') id: string, @Param('playlist_id') playlistId: string): Promise<Playlist[]> {
    return await this.usersService.likePlaylist(id, playlistId);
  }

  @Delete(':id/playlists/:playlist_id')
  @UseGuards(AuthGuard)
  async unlikePlaylist(@Param('id') id: string, @Param('playlist_id') playlistId: string): Promise<Playlist[]> {
    return await this.usersService.unlikePlaylist(id, playlistId);
  }

  @Post(':id/tracks/:track_id')
  @UseGuards(AuthGuard)
  async likeTrack(@Param('id') id: string, @Param('track_id') trackId: string): Promise<Track[]> {
    return await this.usersService.likeTrack(id, trackId);
  }

  @Delete(':id/tracks/:track_id')
  @UseGuards(AuthGuard)
  async unlikeTrack(@Param('id') id: string, @Param('track_id') trackId: string): Promise<Track[]> {
    return await this.usersService.unlikeTrack(id, trackId);
  }
}
