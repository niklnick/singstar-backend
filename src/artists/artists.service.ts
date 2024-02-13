import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { QueryArtistDto } from './dto/query-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(@InjectRepository(Artist) private readonly artistsRepository: Repository<Artist>) { }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist: Artist = this.artistsRepository.create(createArtistDto);

    return await this.artistsRepository.save(artist);
  }

  async findAll(query: QueryArtistDto): Promise<Artist[]> {
    return await this.artistsRepository.find({
      where: { name: query.name ? ILike(`%${query.name}%`) : null }
    });
  }

  async findOne(id: string): Promise<Artist> {
    const artist: Artist = await this.artistsRepository.findOne({
      where: { id: id },
      relations: { albums: true }
    });

    if (!artist) throw new NotFoundException();

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist: Artist = await this.artistsRepository.findOne({ where: { id: id } });

    if (!artist) throw new NotFoundException();

    return await this.artistsRepository.save({ ...artist, ...updateArtistDto });
  }

  async remove(id: string): Promise<Artist> {
    const artist: Artist = await this.artistsRepository.findOne({ where: { id: id } });

    if (!artist) throw new NotFoundException();

    return this.artistsRepository.remove(artist);
  }
}
