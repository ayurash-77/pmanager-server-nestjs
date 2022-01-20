import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { path as appPath } from 'app-root-path';
import * as path from 'path';
import * as sharp from 'sharp';
import * as fse from 'fs-extra';
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
    await fse.ensureDir(uploadDir);

    await fse.writeFile(path.resolve(uploadDir, file.originalname), file.buffer);
    return {
      url: `${process.env.UPLOAD_DIR}/${date}/${file.originalname}`,
      name: file.originalname,
      category: file.category,
    };
  }

  // Move file
  async moveFile(moveFileDto: MoveFileDto) {
    const srcPath = moveFileDto.srcPath;
    const dstPath = moveFileDto.dstPath;
    await fse.ensureDir(path.dirname(dstPath));
    const srcPathExists = await fse.pathExists(srcPath);
    if (srcPathExists) {
      try {
        await fse.move(srcPath, dstPath, { overwrite: true });
      } catch (error) {
        throw new HttpException(`Ошибка чтения/записи файла`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return true;
    }
    return false;
  }

  // Удалить папку/файл
  async remove(path) {
    try {
      await fse.remove(path);
    } catch (e) {
      throw new HttpException(`Ошибка при удалении папки/файла`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
}
