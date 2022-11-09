import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from '../config';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
controllers: [AuthController],
providers: [AuthService, LocalStrategy, JwtStrategy],
imports: [
  UsersModule, PassportModule, JwtModule.registerAsync({
    inject: [config.KEY],
    useFactory: (ConfigService: ConfigType<typeof config>) => {
      return { 
        secret: ConfigService.jwtSecret,
        signOptions: {
          expiresIn: '10d',
        }
      }
    }
  })
]










})
  

export class AuthModule {}
