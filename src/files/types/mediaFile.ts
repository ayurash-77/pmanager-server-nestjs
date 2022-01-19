export class MediaFile {
  originalname: string;
  buffer: Buffer | ArrayBufferLike;
  category?: string;

  constructor(file: Express.Multer.File | MediaFile, category: string) {
    this.originalname = file.originalname;
    this.buffer = file.buffer;
    this.category = category;
  }
}
