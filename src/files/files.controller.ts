import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@app/entities/users/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileElementResponseDto } from '@app/files/dto/fileElementResponse.dto';
import { FilesService } from '@app/files/files.service';
import { MediaFile } from '@app/files/types/mediaFile';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteFileDto } from '@app/files/dto/delete-file.dto';

@ApiTags('Файлы')
@Controller('files')
@UseGuards(AuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // Upload file
  @Post('upload/:category')
  @ApiOperation({ summary: 'Загрузить файл' })
  @ApiResponse({ status: 200, type: FileElementResponseDto })
  @HttpCode(200)
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
      newOriginalname = `projectThumbnail_${this.filesService.getUniqueString()}.${format}`;
    }
    if (category === 'userImage') {
      this.filesService.checkForImage(file);
      const format = 'jpg';
      const size = [320, 320];
      newBuffer = await this.filesService.convertImage(file.buffer, size, format);
      newOriginalname = `userImage_${this.filesService.getUniqueString()}.${format}`;
    }
    if (category === 'brief') {
      this.filesService.checkForBrief(file);
      newOriginalname = `brief_${file.originalname}`;
    }
    const newMediaFile = new MediaFile({ originalname: newOriginalname, buffer: newBuffer }, category);
    return this.filesService.saveFile(newMediaFile);
  }

  // Delete file
  @Delete('')
  @ApiOperation({ summary: 'Удалить файл' })
  // @ApiResponse({ status: 200, type: FileElementResponseDto })
  remove(@Body() deleteFileDto: DeleteFileDto): Promise<void> {
    return this.filesService.remove(deleteFileDto.url);
  }
}
