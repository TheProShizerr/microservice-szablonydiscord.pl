import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TemplateModule } from './templates/template.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    TemplateModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
})
export class AppModule {}
