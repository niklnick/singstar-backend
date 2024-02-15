import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from 'src/tracks/entities/track.entity';
import { ArrayOverlap, DataSource, ILike, Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { QueryPlaylistDto } from './dto/query-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Playlist) private readonly playlistsRepository: Repository<Playlist>
  ) { }

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const playlist: Playlist = this.playlistsRepository.create(createPlaylistDto);

    return await this.playlistsRepository.save(playlist);
  }

  async findAll(query: QueryPlaylistDto): Promise<Playlist[]> {
    return await this.playlistsRepository.find({
      where: {
        title: query.title ? ILike(`%${query.title}%`) : null,
        tracks: query.track ? ArrayOverlap([query.track]) : null
      },
      relations: {
        creator: true,
        tracks: true
      }
    });
  }

  async findOne(id: string): Promise<Playlist> {
    const playlist: Playlist = await this.playlistsRepository.findOne({
      where: { id: id },
      relations: {
        creator: true,
        tracks: true
      }
    });

    if (!playlist) throw new NotFoundException();

    return playlist;
  }

  async update(id: string, updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist> {
    const playlist: Playlist = await this.playlistsRepository.findOne({
      where: { id: id },
      relations: {
        creator: true,
        tracks: true
      }
    });

    if (!playlist) throw new NotFoundException();

    return await this.playlistsRepository.save({ ...playlist, ...updatePlaylistDto });
  }

  async remove(id: string): Promise<Playlist> {
    const playlist: Playlist = await this.playlistsRepository.findOne({
      where: { id: id },
      relations: {
        creator: true,
        tracks: true
      }
    });

    if (!playlist) throw new NotFoundException();

    return this.playlistsRepository.remove(playlist);
  }

  async addTrack(id: string, trackId: string): Promise<Track[]> {
    const playlist: Playlist = await this.findOne(id);

    const track: Track = await this.dataSource.getRepository(Track).findOne({ where: { id: trackId } });

    if (!track) throw new NotFoundException();
    if (playlist.tracks.find((t: Track) => t.id === track.id)) throw new ConflictException();

    playlist.tracks.push(track);

    return (await this.playlistsRepository.save(playlist)).tracks;
  }

  async removeTrack(id: string, trackId: string): Promise<Track[]> {
    const playlist: Playlist = await this.findOne(id);

    const track: Track = await this.dataSource.getRepository(Track).findOne({ where: { id: trackId } });

    if (!track) throw new NotFoundException();
    if (!playlist.tracks.find((t: Track) => t.id === track.id)) throw new ConflictException();

    return (await this.playlistsRepository.save({
      ...playlist,
      tracks: playlist.tracks.filter((t: Track) => t.id !== track.id)
    })).tracks;
  }
}
