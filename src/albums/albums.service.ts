import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { QueryAlbumDto } from './dto/query-ablum.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(@InjectRepository(Album) private readonly albumsRepository: Repository<Album>) { }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album: Album = this.albumsRepository.create(createAlbumDto);

    return await this.albumsRepository.save(album);
  }

  async findAll(query: QueryAlbumDto): Promise<Album[]> {
    return await this.albumsRepository.find({
      where: { title: query.title ? ILike(`%${query.title}%`) : null },
      relations: { artist: true }
    });
  }

  async findOne(id: string): Promise<Album> {
    const album: Album | null = await this.albumsRepository.findOne({
      where: { id: id },
      relations: { artist: true, tracks: true }
    });

    if (!album) throw new NotFoundException();

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album: Album | null = await this.albumsRepository.findOne({
      where: { id: id },
      relations: { artist: true }
    });

    if (!album) throw new NotFoundException();

    return await this.albumsRepository.save({ ...album, ...updateAlbumDto });
  }

  async remove(id: string): Promise<Album> {
    const album: Album | null = await this.albumsRepository.findOne({
      where: { id: id },
      relations: { artist: true }
    });

    if (!album) throw new NotFoundException();

    return await this.albumsRepository.remove(album);
  }
}
