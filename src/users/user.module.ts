import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseModule } from 'src/config/firebase.module';
import { BullModule } from '@nestjs/bullmq';
import { UserConsumer } from './user.queue.consumer';

@Module({
  imports: [
    FirebaseModule,
    BullModule.registerQueue({
      name: 'user-scan',
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 2,
        backoff: {
          type: 'fixed',
          delay: 500,
        },
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserConsumer],
})
export class UserModule {}
