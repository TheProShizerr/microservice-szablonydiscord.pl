import { NestFactory } from '@nestjs/core';
import {
  Transport,
  MicroserviceOptions,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    },
  );

  await app.listen();

  const client = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3001,
    },
  });

  client.send('add_element_to_queue', {}).subscribe((response) => {
    console.log(response);
  });
}
bootstrap();
