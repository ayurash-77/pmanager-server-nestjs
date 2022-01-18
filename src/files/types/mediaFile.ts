export class MediaFile {
  originalname: string;
  buffer: Buffer | ArrayBufferLike;

  constructor(file: Express.Multer.File | MediaFile) {
    this.originalname = file.originalname;
    this.buffer = file.buffer;
  }
}
