import { Controller, HttpCode, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@app/users/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileElementResponseDto } from '@app/files/dto/fileElementResponse.dto';
import { FilesService } from '@app/files/files.service';
import { MediaFile } from '@app/files/types/mediaFile';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // Upload files
  @Post('upload/:category')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('category') category: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponseDto> {
    let newBuffer: Buffer = file.buffer;
    let newOriginalname: string = file.originalname;

    if (category === 'projectThumbnail') {
      this.filesService.checkForImage(file);
      const format = 'jpg';
      const size = [320, 180];
      newBuffer = await this.filesService.convertImage(file.buffer, size, format);
      newOriginalname = `thumbnail_${this.filesService.uniqStr()}.${format}`;
    }
    if (category === 'userImage') {
      this.filesService.checkForImage(file);
      const format = 'jpg';
      const size = [320, 320];
      newBuffer = await this.filesService.convertImage(file.buffer, size, format);
      newOriginalname = `userImage_${this.filesService.uniqStr()}.${format}`;
    }
    if (category === 'brief') {
      this.filesService.checkForBrief(file);
      newOriginalname = `Brief_${file.originalname}`;
    }
    const newMediaFile = new MediaFile({ originalname: newOriginalname, buffer: newBuffer }, category);
    return this.filesService.saveFile(newMediaFile);
  }
}
