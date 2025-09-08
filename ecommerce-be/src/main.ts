import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Kích hoạt validation toàn cục
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,              // Bỏ qua field không khai báo trong DTO
    forbidNonWhitelisted: true,   // Báo lỗi nếu request chứa field thừa
    transform: true,              // Tự động chuyển kiểu dữ liệu (string -> number)
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
