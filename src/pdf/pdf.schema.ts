import * as mongoose from 'mongoose';

export const PdfSchema = new mongoose.Schema({
  buffer: Buffer,
  originalFilename: String,
  updatedAt: { type: Date, default: Date.now },
});

export interface Pdf extends mongoose.Document {
  buffer: Buffer;
  originalFilename: string;
  updatedAt: Date;
}
