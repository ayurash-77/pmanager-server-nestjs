import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@app/users/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileElementResponseDto } from '@app/files/dto/fileElementResponse.dto';
import { FilesService } from '@app/files/files.service';
import { MediaFile } from '@app/files/types/mediaFile';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // Upload Project Thumbnail
  @Post('upload/projectThumbnail')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProjectThumbnail(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponseDto> {
    if (!file.mimetype.includes('image')) {
      throw new HttpException(`Недопустимый формат файла`, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
    const format = 'jpg';
    const size = [320, 180];
    const newBuffer = await this.filesService.convertImage(file.buffer, size, format);

    const newOriginalname = `thumbnail_${this.filesService.uniqStr()}.${format}`;
    const newMediaFile = new MediaFile({ originalname: newOriginalname, buffer: newBuffer });
    return this.filesService.saveFile(newMediaFile);
  }

  // Upload User Image
  @Post('upload/userImage')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserImage(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponseDto> {
    if (!file.mimetype.includes('image')) {
      throw new HttpException(`Недопустимый формат файла`, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
    const format = 'jpg';
    const size = [320, 320];
    const newBuffer = await this.filesService.convertImage(file.buffer, size, format);

    const newOriginalname = `userImage_${this.filesService.uniqStr()}.${format}`;
    const newMediaFile = new MediaFile({ originalname: newOriginalname, buffer: newBuffer });
    return this.filesService.saveFile(newMediaFile);
  }

  // Upload Brief
  @Post('upload/projects/:id/brief')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadBrief(
    @Param() projectId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponseDto> {
    console.log(file.mimetype);
    if (
      !file.mimetype.includes('application/pdf') &&
      !file.mimetype.includes('application/vnd.openxmlformats-officedocument')
    ) {
      throw new HttpException(`Недопустимый формат файла`, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
    const newOriginalname = `Brief_${file.originalname}`;
    const newMediaFile = new MediaFile({ originalname: newOriginalname, buffer: file.buffer });
    return this.filesService.saveFile(newMediaFile);
  }
}
