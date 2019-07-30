import { Module, Logger } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretBeer',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [
    UsersService,
    JwtStrategy,
    { provide: Logger, useFactory: () => new Logger('UserModule') },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
