import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Replace with your frontend's actual origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const { httpAdapter } = app.get(HttpAdapterHost);

  const __dirname1 = path.resolve();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/frontend/dist')));
    httpAdapter.get('*', (req: express.Request, res: express.Response) =>
      res.sendFile(path.resolve(__dirname1, 'frontend', 'dist', 'index.html')),
    );
  } else {
    httpAdapter.get('/api', (req: express.Request, res: express.Response) => {
      res.send('API is running..');
    });
  }

  await app.listen(5000);
}
bootstrap();
