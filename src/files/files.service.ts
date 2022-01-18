import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { path as appPath } from 'app-root-path';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { ensureDir, writeFile } from 'fs-extra';
import { FileElementResponseDto } from '@app/files/dto/fileElementResponse.dto';
import { format } from 'date-fns';
import { MediaFile } from '@app/files/types/mediaFile';

@Injectable()
export class FilesService {
  // Save file
  async saveFile(file: MediaFile): Promise<FileElementResponseDto> {
    const date = format(new Date(), 'yyyy.MM.dd');
    const uploadDir = path.resolve(appPath, 'upload', date);
    await ensureDir(uploadDir);

    await writeFile(path.resolve(uploadDir, file.originalname), file.buffer);
    return {
      url: `${date}/${file.originalname}`,
      name: file.originalname,
    };
  }

  // Get Uniq Str
  uniqStr() {
    return ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }

  // Convert image
  async convertImage(file: Buffer, size?: number[], format?: string): Promise<Buffer> {
    let res;
    if (!size) size = [320, 320];
    if (format === 'jpg') res = sharp(file).resize(size[0], size[1]).jpeg({ quality: 95 });
    if (format === 'png') res = sharp(file).resize(size[0], size[1]).png();
    if (format === 'webp') res = sharp(file).resize(size[0], size[1]).webp();
    return res.toBuffer();
  }

  async createFile(file, homeDir: string): Promise<string> {
    try {
      const srcDir = path.resolve(appPath, 'uploads');
      const dstDir = path.resolve(process.env.WORK_ROOT, homeDir, '.pmdata');

      const fileName = 'project-thumbnail.jpg';

      const srcPath = path.resolve(srcDir, file.originalname);
      const dstPath = path.resolve(dstDir, fileName);

      !fs.existsSync(srcDir) && fs.mkdirSync(srcDir, { recursive: true });
      !fs.existsSync(dstDir) && fs.mkdirSync(dstDir, { recursive: true });

      fs.writeFileSync(srcPath, file.buffer);

      srcPath && (await sharp(srcPath).resize(320, 320).jpeg({ quality: 95 }).toFile(dstPath));
      console.log(srcPath);
      console.log(dstPath);
      // fs.existsSync(srcPath) && fs.rmSync(srcPath);

      return fileName;
    } catch (e) {
      throw new HttpException(`Ошибка записи файла: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
