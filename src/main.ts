import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from './config';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.enableCors(corsConfig);
  await app.listen(PORT);
}
bootstrap();
