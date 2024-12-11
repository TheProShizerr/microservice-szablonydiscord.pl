import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { DataItem } from './interfaces/template.interface';
import { TemplateConsumer } from './template.queue.consumer';

@Injectable()
export class TemplateService {
  constructor(
    @Inject('FIREBASE_APP') private readonly firebaseApp: admin.app.App,
    @InjectQueue('template-scan') private audioQueue: Queue,
    private readonly template: TemplateConsumer,
  ) {}

  async createQueue(): Promise<string> {
    const templateSnapshot = await this.firebaseApp
      .database()
      .ref('Template/box/')
      .once('value');

    const array: DataItem[] = Object.values(templateSnapshot.val());

    for (const element of array) {
      await this.audioQueue.add('template-scan', element, { delay: 1500 });
    }

    this.template.toggleQueue = true;

    return 'all items added to queue';
  }
}
