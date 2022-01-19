import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { path as appPath } from 'app-root-path';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { ensureDir, writeFile, move } from 'fs-extra';
import { FileElementResponseDto } from '@app/files/dto/fileElementResponse.dto';
import { format } from 'date-fns';
import { MediaFile } from '@app/files/types/mediaFile';
import { MoveFileDto } from '@app/files/dto/move-file.dto';

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
      category: file.category,
    };
  }

  // Move file
  async moveFile(moveFileDto: MoveFileDto) {
    const srcPath = moveFileDto.srcPath;
    const dstPath = moveFileDto.dstPath;
    await ensureDir(path.dirname(dstPath));

    // console.log(srcPath);
    // console.log(dstPath);

    fs.access(srcPath, fs.constants.R_OK, async err => {
      if (!err) {
        try {
          await move(srcPath, dstPath, { overwrite: true });
        } catch (error) {
          throw new HttpException(`Ошибка записи файла`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    });
    return true;
  }

  // Get Unique String
  getUniqueString() {
    return ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }

  // Check for file is an image
  checkForImage(file: Express.Multer.File): boolean {
    if (!file.mimetype.includes('image')) {
      throw new HttpException(`Недопустимый формат файла`, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
    return true;
  }

  // Check for file is a brief
  checkForBrief(file: Express.Multer.File): boolean {
    if (
      !file.mimetype.includes('application/pdf') &&
      !file.mimetype.includes('application/vnd.openxmlformats-officedocument')
    ) {
      throw new HttpException(`Недопустимый формат файла`, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
    return true;
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
