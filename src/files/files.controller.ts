import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@app/users/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileElementResponseDto } from '@app/files/dto/fileElementResponse.dto';
import { FilesService } from '@app/files/files.service';
import { MediaFile } from '@app/files/types/mediaFile';
import * as path from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post('upload')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFiles(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponseDto[]> {
    const saveArray: MediaFile[] = [];

    if (file.mimetype.includes('image')) {
      const format = 'jpg';
      const size = [320, 320];
      const newBuffer = await this.filesService.convertImage(file.buffer, size, format);
      const ext = path.extname(file.originalname);
      const newOriginalname = `${file.originalname.split(ext)[0]}_${size[0]}x${size[1]}.${format}`;

      saveArray.push(new MediaFile({ originalname: newOriginalname, buffer: newBuffer }));
    } else {
      saveArray.push(new MediaFile(file));
    }
    return this.filesService.saveFiles(saveArray);
  }
}
