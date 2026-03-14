import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from '@hocuspocus/server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Start NestJS server on port 3001
  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);

  // Start standalone Hocuspocus server on port 3000 for Collaboration
  const hocuspocusServer = new Server({
    port: 3000,
    async onConnect(data) {
      console.log(`User connected to Hocuspocus: ${data.documentName}`);
    },
    async onDisconnect(data) {
       console.log(`User disconnected from Hocuspocus: ${data.documentName}`);
    }
  });

  await hocuspocusServer.listen();
  console.log('Hocuspocus Server is running on ws://localhost:3000');
}

bootstrap();
