import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '10mb' }));
  // Enable global validation pipes (already in your code)
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS with specific options
  app.enableCors({
    origin: 'http://localhost:3000',  // Only allow requests from this frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    credentials: true,  // Allow credentials such as cookies
  });

  // Listen on a port, fallback to 8080 if not defined in environment variable
  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
