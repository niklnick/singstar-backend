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

  @Post(':id/albums/:album_id')
  async saveAlbum(@Param('id') id: string, @Param('album_id') albumId: string): Promise<User> {
    return await this.usersService.saveAlbum(id, albumId);
  }

  @Post(':id/artists/:artist_id')
  async saveArtist(@Param('id') id: string, @Param('artist_id') artistId: string): Promise<User> {
    return await this.usersService.saveAlbum(id, artistId);
  }

  @Post(':id/tracks/:track_id')
  async saveTrack(@Param('id') id: string, @Param('track_id') trackId: string): Promise<User> {
    return await this.usersService.saveAlbum(id, trackId);
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

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  @Delete(':id/albums/:album_id')
  async removeAlbum(@Param('id') id: string, @Param('album_id') albumId: string): Promise<User> {
    return this.usersService.removeAlbum(id, albumId);
  }

  @Delete(':id/artists/:artist_id')
  async removeArtist(@Param('id') id: string, @Param('artist_id') artistId: string): Promise<User> {
    return this.usersService.removeArtist(id, artistId);
  }

  @Delete(':id/tracks/:track_id')
  async removeTrack(@Param('id') id: string, @Param('track_id') trackId: string): Promise<User> {
    return this.usersService.removeTrack(id, trackId);
  }
}
