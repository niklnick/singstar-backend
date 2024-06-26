import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppRoutingModule } from './app-routing.module';
import { TypeormConfigService } from './config/typeorm-config.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({ useClass: TypeormConfigService }),
        AppRoutingModule
    ]
})
export class AppModule { }
