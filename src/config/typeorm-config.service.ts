import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('POSTGRES_HOST'),
            port: this.configService.get<number>('POSTGRES_PORT'),
            username: this.configService.get<string>('POSTGRES_USERNAME'),
            password: this.configService.get<string>('POSTGRES_PASSWORD'),
            database: this.configService.get<string>('POSTGRES_DATABASE'),
            autoLoadEntities: true,
            synchronize: true
        }
    }
}
