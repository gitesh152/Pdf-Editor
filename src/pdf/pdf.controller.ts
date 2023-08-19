import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  PDFCheckBox,
  PDFDocument,
  PDFDropdown,
  PDFField,
  PDFRadioGroup,
  PDFTextField,
} from 'pdf-lib';
import { Buffer } from 'buffer';
import { FileInterceptor } from '@nestjs/platform-express';
import { PdfService } from './pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private pdfService: PdfService) {}

  //Get all pdf list Route
  @Get('list')
  async getList(
    @Res() response: Response,
  ): Promise<{ pdfList: { name: string; value: string }[] }> {
    const getPdfList = await this.pdfService.getPdfList();
    response.json({ pdfList: getPdfList });
    response.end();
    return;
  }

  //Post pdf and its name Route
  @Post('fill')
  @UseInterceptors(FileInterceptor('pdfFile'))
  async fillData(
    @UploadedFile() pdfFile: Express.Multer.File,
    @Body() body: Record<string, any>,
    @Res() response: Response,
  ) {
    const pdfDoc = await PDFDocument.load(pdfFile.buffer);
    const form = pdfDoc.getForm();
    const fields: PDFField[] = form.getFields();
    if (form) {
      for (const field of fields) {
        if (field instanceof PDFTextField) {
          field.setText(body[field.getName()]);
          field.getText();
        } else if (field instanceof PDFDropdown) {
          field.select(body[field.getName()]);
        } else if (field instanceof PDFRadioGroup) {
          field.select(body[field.getName()]);
        } else if (field instanceof PDFCheckBox) {
          body[field.getName()] === 'true' ? field.check() : '';
        }
      }
    }
    const updatedPdfBytes = await pdfDoc.save();
    await this.pdfService.savePdf(
      Buffer.from(updatedPdfBytes),
      pdfFile.originalname,
    );
    response.setHeader('Content-Type', 'application/pdf');
    response.end(Buffer.from(updatedPdfBytes));
  }

  //Get pdf by ID Route
  @Get('/single/:id')
  async getPdf(@Param('id') id: string, @Res() response: Response) {
    const pdfData = await this.pdfService.getPdfData(id);
    response.setHeader('Content-Type', 'application/json');
    response.end(
      JSON.stringify({ data: pdfData.data, fileName: pdfData.fileName }),
    );
  }
}
