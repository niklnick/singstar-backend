import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
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

  async findOne(id: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { id: id },
      relations: {
        favouriteArtists: true,
        favouriteAlbums: true,
        favouriteTracks: true
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

  async saveArtist(id: string, artistId: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { id: id },
      relations: { favouriteArtists: true }
    });

    if (!user) throw new NotFoundException();

    const artist: Artist = await this.dataSource.getRepository(Artist).findOne({ where: { id: artistId } });

    if (!artist) throw new NotFoundException();
    if (user.favouriteArtists.find((a: Artist) => a.id === artist.id)) throw new ConflictException();

    user.favouriteArtists.push(artist);

    return await this.usersRepository.save(user);
  }

  async saveAlbum(id: string, albumId: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { id: id },
      relations: { favouriteAlbums: true }
    });

    if (!user) throw new NotFoundException();

    const album: Album = await this.dataSource.getRepository(Album).findOne({ where: { id: albumId } });

    if (!album) throw new NotFoundException();
    if (user.favouriteAlbums.find((a: Album) => a.id === album.id)) throw new ConflictException();

    user.favouriteAlbums.push(album);

    return await this.usersRepository.save(user);
  }

  async saveTrack(id: string, trackId: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { id: id },
      relations: { favouriteTracks: true }
    });

    if (!user) throw new NotFoundException();

    const track: Track = await this.dataSource.getRepository(Track).findOne({ where: { id: trackId } });

    if (!track) throw new NotFoundException();
    if (user.favouriteTracks.find((t: Track) => t.id === track.id)) throw new ConflictException();

    user.favouriteTracks.push(track);

    return await this.usersRepository.save(user);
  }

  async removeArtist(id: string, artistId: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { id: id },
      relations: { favouriteArtists: true }
    });

    if (!user) throw new NotFoundException();

    const artist: Artist = await this.dataSource.getRepository(Artist).findOne({ where: { id: artistId } });

    if (!artist) throw new NotFoundException();
    if (!user.favouriteArtists.find((a: Artist) => a.id === artist.id)) throw new ConflictException();

    return await this.usersRepository.save({
      ...user,
      favouriteArtists: user.favouriteArtists.filter((a: Artist) => a.id !== artist.id)
    });
  }

  async removeAlbum(id: string, albumId: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { id: id },
      relations: { favouriteAlbums: true }
    });

    if (!user) throw new NotFoundException();

    const album: Album = await this.dataSource.getRepository(Album).findOne({ where: { id: albumId } });

    if (!album) throw new NotFoundException();
    if (!user.favouriteAlbums.find((a: Album) => a.id === album.id)) throw new ConflictException();

    return await this.usersRepository.save({
      ...user,
      favouriteAlbums: user.favouriteAlbums.filter((a: Album) => a.id !== album.id)
    });
  }

  async removeTrack(id: string, trackId: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { id: id },
      relations: { favouriteTracks: true }
    });

    if (!user) throw new NotFoundException();

    const track: Track = await this.dataSource.getRepository(Track).findOne({ where: { id: trackId } });

    if (!track) throw new NotFoundException();
    if (!user.favouriteTracks.find((t: Track) => t.id === track.id)) throw new ConflictException();

    return await this.usersRepository.save({
      ...user,
      favouriteTracks: user.favouriteTracks.filter((t: Track) => t.id !== track.id)
    });
  }

  async remove(id: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) throw new NotFoundException();

    return this.usersRepository.remove(user);
  }
}
