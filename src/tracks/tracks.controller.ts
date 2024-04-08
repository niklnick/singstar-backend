import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { QueryTrackDto } from './dto/query-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TracksService } from './tracks.service';

@Controller()
export class TracksController {
  constructor(private readonly tracksService: TracksService) { }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  async findAll(@Query() query: QueryTrackDto): Promise<Track[]> {
    return await this.tracksService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Track> {
    return await this.tracksService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto): Promise<Track> {
    return await this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Track> {
    return await this.tracksService.remove(id);
  }
}
