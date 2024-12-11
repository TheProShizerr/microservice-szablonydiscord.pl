import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject } from '@nestjs/common';
import { Job } from 'bullmq';
import * as admin from 'firebase-admin';

@Processor('user-scan')
export class UserConsumer extends WorkerHost {
  private status = false;

  set toggleStatus(value: boolean) {
    this.status = value;
  }

  get isProcessing(): boolean {
    return this.status;
  }

  constructor(@Inject('FIREBASE_APP') private readonly admin: admin.app.App) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<void> {
    if (!this.isProcessing) return;

    try {
      const userRef = await this.admin
        .database()
        .ref(`User/${job.data.userId}`)
        .once('value');
      const userData = userRef.val();

      if (!userData?.templates || !Array.isArray(userData?.templates)) return;

      const templatesCopy = [...userData.templates];

      for (const element of templatesCopy) {
        const checkTemplateExists = await this.admin
          .database()
          .ref(`Template/box/${element}`)
          .once('value');

        if (!checkTemplateExists.exists()) {
          const newArray = userData.templates.filter(
            (item) => item !== element,
          );

          await this.admin.database().ref(`User/${userData.userId}`).update({
            templateCount: newArray.length,
            templates: newArray,
          });

          userData.templates = newArray;
        }

        console.log('skanuje', userData.username);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
