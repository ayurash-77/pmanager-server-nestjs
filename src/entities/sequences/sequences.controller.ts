import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SequencesService } from './sequences.service';
import { CreateSequenceDto } from './dto/create-sequence.dto';
import { UpdateSequenceDto } from './dto/update-sequence.dto';

@Controller('sequences')
export class SequencesController {
  constructor(private readonly sequencesService: SequencesService) {}

  @Post()
  create(@Body() createSequenceDto: CreateSequenceDto) {
    return this.sequencesService.create(createSequenceDto);
  }

  @Get()
  findAll() {
    return this.sequencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sequencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSequenceDto: UpdateSequenceDto) {
    return this.sequencesService.update(+id, updateSequenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sequencesService.remove(+id);
  }
}
