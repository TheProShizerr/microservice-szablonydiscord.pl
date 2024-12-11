import { Module } from '@nestjs/common';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { FirebaseModule } from 'src/config/firebase.module';
import { BullModule } from '@nestjs/bullmq';
import { TemplateConsumer } from './template.queue.consumer';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    FirebaseModule,
    HttpModule,
    BullModule.registerQueue({
      name: 'template-scan',
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 5,
        backoff: {
          type: 'fixed',
          delay: 5000,
        },
      },
    }),
  ],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateConsumer],
})
export class TemplateModule {}
