import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayOverlap, ILike, Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { QueryTrackDto } from './dto/query-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(@InjectRepository(Track) private readonly tracksRepository: Repository<Track>) { }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track: Track = this.tracksRepository.create(createTrackDto);

    return await this.tracksRepository.save(track);
  }

  async findAll(query: QueryTrackDto): Promise<Track[]> {
    return await this.tracksRepository.find({
      where: {
        title: query.title ? ILike(`%${query.title}%`) : null,
        genres: query.genres ? ArrayOverlap(query.genres) : null,
        language: query.language
      },
      relations: {
        album: true,
        artist: true,
        featuredArtists: true
      }
    });
  }

  async findOne(id: string): Promise<Track> {
    const track: Track | null = await this.tracksRepository.findOne({
      where: { id: id },
      relations: {
        album: true,
        artist: true,
        featuredArtists: true,
        playlists: true
      }
    });

    if (!track) throw new NotFoundException();

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track: Track | null = await this.tracksRepository.findOne({
      where: { id: id },
      relations: {
        album: true,
        artist: true,
        featuredArtists: true
      }
    });

    if (!track) throw new NotFoundException();

    return await this.tracksRepository.save({ ...track, ...updateTrackDto });
  }

  async remove(id: string): Promise<Track> {
    const track: Track | null = await this.tracksRepository.findOne({
      where: { id: id },
      relations: {
        album: true,
        artist: true,
        featuredArtists: true
      }
    });

    if (!track) throw new NotFoundException();

    return await this.tracksRepository.remove(track);
  }
}
