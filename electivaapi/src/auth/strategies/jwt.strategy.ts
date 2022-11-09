import { Inject, Injectable} from '@nestjs/common'; 
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../../config'; 
import { ConfigService, ConfigType } from '@nestjs/config';
import { PayloadToken } from '../dto/auth.dto';

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { 
 constructor(@Inject(config.KEY) ConfigService: ConfigType<typeof config>) { 
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ingoreExperation: false,
        secretOrkey: ConfigService.jwtSecret,
    });

    }

    async validate(payload: PayloadToken) { 
        return payload; 
    }
}