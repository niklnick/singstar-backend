import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Playlist } from 'src/playlists/entities/playlist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string, query: QueryUserDto): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { id: id },
      relations: {
        favoriteArtists: query.relations?.favoriteArtists ?? false,
        favoriteAlbums: query.relations?.favoriteAlbums ?? false,
        favoriteTracks: query.relations?.favoriteTracks ?? false,
        favoritePlaylists: query.relations?.favoritePlaylists ?? false
      }
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) throw new NotFoundException();

    return await this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) throw new NotFoundException();

    return this.usersRepository.remove(user);
  }

  async addArtist(id: string, artistId: string): Promise<Artist[]> {
    const user: User = await this.findOne(id, { relations: { favoriteArtists: true } });

    const artist: Artist = await this.dataSource.getRepository(Artist).findOne({ where: { id: artistId } });

    if (!artist) throw new NotFoundException();
    if (user.favoriteArtists.find((a: Artist) => a.id === artist.id)) throw new ConflictException();

    user.favoriteArtists.push(artist);

    return (await this.usersRepository.save(user)).favoriteArtists;
  }

  async removeArtist(id: string, artistId: string): Promise<Artist[]> {
    const user: User = await this.findOne(id, { relations: { favoriteArtists: true } });

    const artist: Artist = await this.dataSource.getRepository(Artist).findOne({ where: { id: artistId } });

    if (!artist) throw new NotFoundException();
    if (!user.favoriteArtists.find((a: Artist) => a.id === artist.id)) throw new ConflictException();

    return (await this.usersRepository.save({
      ...user,
      favoriteArtists: user.favoriteArtists.filter((a: Artist) => a.id !== artist.id)
    })).favoriteArtists;
  }

  async addAlbum(id: string, albumId: string): Promise<Album[]> {
    const user: User = await this.findOne(id, { relations: { favoriteAlbums: true } });

    const album: Album = await this.dataSource.getRepository(Album).findOne({ where: { id: albumId } });

    if (!album) throw new NotFoundException();
    if (user.favoriteAlbums.find((a: Album) => a.id === album.id)) throw new ConflictException();

    user.favoriteAlbums.push(album);

    return (await this.usersRepository.save(user)).favoriteAlbums;
  }

  async removeAlbum(id: string, albumId: string): Promise<Album[]> {
    const user: User = await this.findOne(id, { relations: { favoriteAlbums: true } });

    const album: Album = await this.dataSource.getRepository(Album).findOne({ where: { id: albumId } });

    if (!album) throw new NotFoundException();
    if (!user.favoriteAlbums.find((a: Album) => a.id === album.id)) throw new ConflictException();

    return (await this.usersRepository.save({
      ...user,
      favoriteAlbums: user.favoriteAlbums.filter((a: Album) => a.id !== album.id)
    })).favoriteAlbums;
  }

  async addTrack(id: string, trackId: string): Promise<Track[]> {
    const user: User = await this.findOne(id, { relations: { favoriteTracks: true } });

    const track: Track = await this.dataSource.getRepository(Track).findOne({ where: { id: trackId } });

    if (!track) throw new NotFoundException();
    if (user.favoriteTracks.find((t: Track) => t.id === track.id)) throw new ConflictException();

    user.favoriteTracks.push(track);

    return (await this.usersRepository.save(user)).favoriteTracks;
  }

  async removeTrack(id: string, trackId: string): Promise<Track[]> {
    const user: User = await this.findOne(id, { relations: { favoriteTracks: true } });

    const track: Track = await this.dataSource.getRepository(Track).findOne({ where: { id: trackId } });

    if (!track) throw new NotFoundException();
    if (!user.favoriteTracks.find((t: Track) => t.id === track.id)) throw new ConflictException();

    return (await this.usersRepository.save({
      ...user,
      favoriteTracks: user.favoriteTracks.filter((t: Track) => t.id !== track.id)
    })).favoriteTracks;
  }

  async addPlaylist(id: string, playlistId: string): Promise<Playlist[]> {
    const user: User = await this.findOne(id, { relations: { favoritePlaylists: true } });

    const playlist: Playlist = await this.dataSource.getRepository(Playlist).findOne({ where: { id: playlistId } });

    if (!playlist) throw new NotFoundException();
    if (user.favoritePlaylists.find((p: Playlist) => p.id === playlist.id)) throw new ConflictException();

    user.favoritePlaylists.push(playlist);

    return (await this.usersRepository.save(user)).favoritePlaylists;
  }

  async removePlaylist(id: string, playlistId: string): Promise<Playlist[]> {
    const user: User = await this.findOne(id, { relations: { favoritePlaylists: true } });

    const playlist: Playlist = await this.dataSource.getRepository(Playlist).findOne({ where: { id: playlistId } });

    if (!playlist) throw new NotFoundException();
    if (!user.favoritePlaylists.find((p: Playlist) => p.id === playlist.id)) throw new ConflictException();

    return (await this.usersRepository.save({
      ...user,
      favoritePlaylists: user.favoritePlaylists.filter((p: Playlist) => p.id !== playlist.id)
    })).favoritePlaylists;
  }
}
