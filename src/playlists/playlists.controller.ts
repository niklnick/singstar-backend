import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Track } from 'src/tracks/entities/track.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { QueryPlaylistDto } from './dto/query-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { PlaylistsService } from './playlists.service';

@Controller()
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) { }

  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    return await this.playlistsService.create(createPlaylistDto);
  }

  @Get()
  async findAll(@Query() query: QueryPlaylistDto): Promise<Playlist[]> {
    return await this.playlistsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Playlist> {
    return await this.playlistsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist> {
    return await this.playlistsService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Playlist> {
    return await this.playlistsService.remove(id);
  }

  @Patch(':id/tracks/:track_id')
  async addTrack(@Param('id') id: string, @Param('track_id') trackId: string): Promise<Track[]> {
    return await this.playlistsService.addTrack(id, trackId);
  }

  @Delete(':id/tracks/:track_id')
  async removeTrack(@Param('id') id: string, @Param('track_id') trackId: string): Promise<Track[]> {
    return await this.playlistsService.removeTrack(id, trackId);
  }
}
