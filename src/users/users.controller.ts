import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Playlist } from 'src/playlists/entities/playlist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Body() query: QueryUserDto): Promise<User> {
    return await this.usersService.findOne(id, query);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  @Post(':id/artists/:artist_id')
  async addArtist(@Param('id') id: string, @Param('artist_id') artistId: string): Promise<Artist[]> {
    return await this.usersService.addArtist(id, artistId);
  }

  @Delete(':id/artists/:artist_id')
  async removeArtist(@Param('id') id: string, @Param('artist_id') artistId: string): Promise<Artist[]> {
    return this.usersService.removeArtist(id, artistId);
  }

  @Post(':id/albums/:album_id')
  async addAlbum(@Param('id') id: string, @Param('album_id') albumId: string): Promise<Album[]> {
    return await this.usersService.addAlbum(id, albumId);
  }

  @Delete(':id/albums/:album_id')
  async removeAlbum(@Param('id') id: string, @Param('album_id') albumId: string): Promise<Album[]> {
    return this.usersService.removeAlbum(id, albumId);
  }

  @Post(':id/tracks/:track_id')
  async addTrack(@Param('id') id: string, @Param('track_id') trackId: string): Promise<Track[]> {
    return await this.usersService.addTrack(id, trackId);
  }

  @Delete(':id/tracks/:track_id')
  async removeTrack(@Param('id') id: string, @Param('track_id') trackId: string): Promise<Track[]> {
    return this.usersService.removeTrack(id, trackId);
  }

  @Post(':id/playlists/:playlist_id')
  async addPlaylist(@Param('id') id: string, @Param('playlist_id') playlistId: string): Promise<Playlist[]> {
    return await this.usersService.addPlaylist(id, playlistId);
  }

  @Delete(':id/playlists/:playlist_id')
  async removePlayist(@Param('id') id: string, @Param('playlist_id') playlistId: string): Promise<Playlist[]> {
    return this.usersService.removePlaylist(id, playlistId);
  }
}
