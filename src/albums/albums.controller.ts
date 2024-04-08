import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { QueryAlbumDto } from './dto/query-ablum.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Controller()
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) { }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll(@Query() query: QueryAlbumDto): Promise<Album[]> {
    return await this.albumsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Album> {
    return await this.albumsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    return await this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Album> {
    return await this.albumsService.remove(id);
  }
}
