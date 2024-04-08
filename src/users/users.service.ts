import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Playlist } from 'src/playlists/entities/playlist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { DataSource, Repository } from 'typeorm';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) { }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string, query: QueryUserDto): Promise<User> {
    const user: User | null = await this.usersRepository.findOne({
      where: { id: id },
      relations: {
        likedArtists: query.relations?.likedArtists ?? false,
        likedAlbums: query.relations?.likedAlbums ?? false,
        likedTracks: query.relations?.likedTracks ?? false,
        likedPlaylists: query.relations?.likedPlaylists ?? false
      }
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User | null = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) throw new NotFoundException();

    return await this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: string): Promise<User> {
    const user: User | null = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) throw new NotFoundException();

    return await this.usersRepository.remove(user);
  }

  async likeAlbum(id: string, albumId: string): Promise<Album[]> {
    const user: User | null = await this.findOne(id, { relations: { likedAlbums: true } });
    const album: Album | null = await this.dataSource.getRepository(Album).findOne({ where: { id: albumId } });

    if (!album) throw new NotFoundException();
    if (user.likedAlbums.find((a: Album) => a.id === album.id)) throw new ConflictException();

    user.likedAlbums.push(album);

    return (await this.usersRepository.save(user)).likedAlbums;
  }

  async unlikeAlbum(id: string, albumId: string): Promise<Album[]> {
    const user: User | null = await this.findOne(id, { relations: { likedAlbums: true } });
    const album: Album | null = await this.dataSource.getRepository(Album).findOne({ where: { id: albumId } });

    if (!album) throw new NotFoundException();
    if (!user.likedAlbums.find((a: Album) => a.id === album.id)) throw new ConflictException();

    return (await this.usersRepository.save({
      ...user,
      likedAlbums: user.likedAlbums.filter((a: Album) => a.id !== album.id)
    })).likedAlbums;
  }

  async likeArtist(id: string, artistId: string): Promise<Artist[]> {
    const user: User | null = await this.findOne(id, { relations: { likedArtists: true } });
    const artist: Artist | null = await this.dataSource.getRepository(Artist).findOne({ where: { id: artistId } });

    if (!artist) throw new NotFoundException();
    if (user.likedArtists.find((a: Artist) => a.id === artist.id)) throw new ConflictException();

    user.likedArtists.push(artist);

    return (await this.usersRepository.save(user)).likedArtists;
  }

  async unlikeArtist(id: string, artistId: string): Promise<Artist[]> {
    const user: User | null = await this.findOne(id, { relations: { likedArtists: true } });
    const artist: Artist | null = await this.dataSource.getRepository(Artist).findOne({ where: { id: artistId } });

    if (!artist) throw new NotFoundException();
    if (!user.likedArtists.find((a: Artist) => a.id === artist.id)) throw new ConflictException();

    return (await this.usersRepository.save({
      ...user,
      likedArtists: user.likedArtists.filter((a: Artist) => a.id !== artist.id)
    })).likedArtists;
  }

  async likePlaylist(id: string, playlistId: string): Promise<Playlist[]> {
    const user: User | null = await this.findOne(id, { relations: { likedPlaylists: true } });
    const playlist: Playlist | null = await this.dataSource.getRepository(Playlist).findOne({ where: { id: playlistId } });

    if (!playlist) throw new NotFoundException();
    if (user.likedPlaylists.find((p: Playlist) => p.id === playlist.id)) throw new ConflictException();

    user.likedPlaylists.push(playlist);

    return (await this.usersRepository.save(user)).likedPlaylists;
  }

  async unlikePlaylist(id: string, playlistId: string): Promise<Playlist[]> {
    const user: User | null = await this.findOne(id, { relations: { likedPlaylists: true } });
    const playlist: Playlist | null = await this.dataSource.getRepository(Playlist).findOne({ where: { id: playlistId } });

    if (!playlist) throw new NotFoundException();
    if (!user.likedPlaylists.find((p: Playlist) => p.id === playlist.id)) throw new ConflictException();

    return (await this.usersRepository.save({
      ...user,
      likedPlaylists: user.likedPlaylists.filter((p: Playlist) => p.id !== playlist.id)
    })).likedPlaylists;
  }

  async likeTrack(id: string, trackId: string): Promise<Track[]> {
    const user: User | null = await this.findOne(id, { relations: { likedTracks: true } });
    const track: Track | null = await this.dataSource.getRepository(Track).findOne({ where: { id: trackId } });

    if (!track) throw new NotFoundException();
    if (user.likedTracks.find((t: Track) => t.id === track.id)) throw new ConflictException();

    user.likedTracks.push(track);

    return (await this.usersRepository.save(user)).likedTracks;
  }

  async unlikeTrack(id: string, trackId: string): Promise<Track[]> {
    const user: User | null = await this.findOne(id, { relations: { likedTracks: true } });
    const track: Track | null = await this.dataSource.getRepository(Track).findOne({ where: { id: trackId } });

    if (!track) throw new NotFoundException();
    if (!user.likedTracks.find((t: Track) => t.id === track.id)) throw new ConflictException();

    return (await this.usersRepository.save({
      ...user,
      likedTracks: user.likedTracks.filter((t: Track) => t.id !== track.id)
    })).likedTracks;
  }
}
