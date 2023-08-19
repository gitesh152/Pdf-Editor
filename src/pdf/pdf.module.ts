import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { PdfSchema } from './pdf.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Pdf', schema: PdfSchema }])],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
