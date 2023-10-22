import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(process.env.PORT);

  console.log(`## App started on port ${process.env.PORT}`);
}
bootstrap();
