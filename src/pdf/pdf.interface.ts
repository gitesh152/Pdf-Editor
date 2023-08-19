import { Document } from 'mongoose';

export interface Pdf extends Document {
  buffer: Buffer;
  originalFilename: string;
  updatedAt: Date;
}
