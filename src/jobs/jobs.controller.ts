import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Job } from '@app/jobs/entities/job.entity';
import { CreateJobDto } from '@app/jobs/dto/create-job.dto';
import { UpdateJobDto } from '@app/jobs/dto/update-job.dto';

@ApiTags('Типы работ')
@Controller('api/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // Создать новый тип работ
  @Post()
  @ApiOperation({ summary: 'Создать новый тип работ' })
  @ApiResponse({ status: 200, type: Job })
  create(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsService.create(createJobDto);
  }

  // Получить все тип работи
  @Get()
  @ApiOperation({ summary: 'Получить все тип работи' })
  @ApiResponse({ status: 200, type: [Job] })
  findAll() {
    return this.jobsService.getAll();
  }

  // Получить тип работ по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить тип работ по ID' })
  @ApiResponse({ status: 200, type: Job })
  findById(@Param('id') id: string) {
    return this.jobsService.getById(+id);
  }

  // Изменить тип работ по ID
  @Patch(':id')
  @ApiOperation({ summary: 'Изменить тип работ по ID' })
  @ApiResponse({ status: 200, type: Job })
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  // Удалить тип работ по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить тип работ по ID' })
  @ApiResponse({ status: 200, type: Job })
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
