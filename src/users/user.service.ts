import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { delay, Queue } from 'bullmq';
import * as admin from 'firebase-admin';
import { User } from './interface/user.interface';
import { UserConsumer } from './user.queue.consumer';

@Injectable()
export class UserService {
  constructor(
    @Inject('FIREBASE_APP') private readonly firebaseApp: admin.app.App,
    @InjectQueue('user-scan') private userQueue: Queue,
    private readonly user: UserConsumer,
  ) {}

  async scanUser(): Promise<string> {
    try {
      const getUsers = await this.firebaseApp
        .database()
        .ref('User/')
        .once('value');
      const getDataUser: User[] = Object.values(getUsers.val());

      for (const element of getDataUser) {
        await this.userQueue.add('user-scan', element, { delay: 2000 });
      }

      this.user.toggleStatus = true;

      return 'all users scaning';
    } catch (err) {
      console.log(err);
    }
  }
}
