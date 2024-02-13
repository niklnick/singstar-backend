import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(@InjectRepository(Track) private readonly tracksRepository: Repository<Track>) { }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track: Track = this.tracksRepository.create(createTrackDto);

    return await this.tracksRepository.save(track);
  }

  async findAll(): Promise<Track[]> {
    return await this.tracksRepository.find({
      relations: {
        artist: true,
        album: true
      }
    });
  }

  async findOne(id: string): Promise<Track> {
    const track: Track = await this.tracksRepository.findOne({
      where: { id: id },
      relations: {
        artist: true,
        album: true
      }
    });

    if (!track) throw new NotFoundException();

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track: Track = await this.tracksRepository.findOne({
      where: { id: id },
      relations: {
        artist: true,
        album: true
      }
    });

    if (!track) throw new NotFoundException();

    return await this.tracksRepository.save({ ...track, ...updateTrackDto });
  }

  async remove(id: string): Promise<Track> {
    const track: Track = await this.tracksRepository.findOne({
      where: { id: id },
      relations: {
        artist: true,
        album: true
      }
    });

    if (!track) throw new NotFoundException();

    return this.tracksRepository.remove(track);
  }
}
