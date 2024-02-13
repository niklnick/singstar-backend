import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
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
  async findAll(): Promise<Track[]> {
    return await this.tracksService.findAll();
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
    return this.tracksService.remove(id);
  }
}
