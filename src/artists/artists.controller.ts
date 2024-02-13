import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { QueryArtistDto } from './dto/query-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Controller()
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) { }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  async findAll(@Query() query: QueryArtistDto): Promise<Artist[]> {
    return await this.artistsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Artist> {
    return await this.artistsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto): Promise<Artist> {
    return await this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Artist> {
    return this.artistsService.remove(id);
  }
}
