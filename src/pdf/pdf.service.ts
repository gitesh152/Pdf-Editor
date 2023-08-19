import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pdf } from './pdf.interface';

@Injectable()
export class PdfService {
  constructor(@InjectModel('Pdf') private pdfModel: Model<Pdf>) {}

  //Service to get PDF List
  async getPdfList(): Promise<{ name: string; value: string }[]> {
    const formFields: { name: string; value: string }[] = [];
    const allPdfs = await this.pdfModel.find();
    allPdfs.forEach((pdf) => {
      formFields.push({ name: pdf.originalFilename, value: pdf._id });
    });
    return formFields;
  }

  //service to get pdf by ID
  async getPdfData(id: string): Promise<{ data: Buffer; fileName: string }> {
    const pdfDocument = await this.pdfModel.findById(id).exec();
    if (!pdfDocument) {
      throw new NotFoundException('PDF not found');
    }
    return { data: pdfDocument.buffer, fileName: pdfDocument.originalFilename }; // Assuming 'data' contains the PDF data as a Buffer
  }

  //service to save pdf and its name
  async savePdf(pdfBuffer: Buffer, fileName: string): Promise<Pdf> {
    const newPdf = new this.pdfModel({
      buffer: pdfBuffer,
      originalFilename: fileName,
    });
    return newPdf.save();
  }
}
