import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/save_artist/:artist_id')
  async saveArtist(@Param('id') id: string, @Param('artist_id') artistId: string): Promise<User> {
    return await this.usersService.saveArtist(id, artistId);
  }

  @Patch(':id/save_album/:album_id')
  async saveAlbum(@Param('id') id: string, @Param('album_id') albumId: string): Promise<User> {
    return await this.usersService.saveAlbum(id, albumId);
  }

  @Patch(':id/save_track/:track_id')
  async saveTrack(@Param('id') id: string, @Param('track_id') trackId: string): Promise<User> {
    return await this.usersService.saveTrack(id, trackId);
  }

  @Patch(':id/remove_artist/:artist_id')
  async removeArtist(@Param('id') id: string, @Param('artist_id') artistId: string): Promise<User> {
    return await this.usersService.removeArtist(id, artistId);
  }

  @Patch(':id/remove_album/:album_id')
  async removeAlbum(@Param('id') id: string, @Param('album_id') albumId: string): Promise<User> {
    return await this.usersService.removeAlbum(id, albumId);
  }

  @Patch(':id/remove_track/:track_id')
  async removeTrack(@Param('id') id: string, @Param('track_id') trackId: string): Promise<User> {
    return await this.usersService.removeTrack(id, trackId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
