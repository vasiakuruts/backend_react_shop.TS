import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { CreatePaginationDto } from './dto/create-pagination.dto';
import { UpdatePaginationDto } from './dto/update-pagination.dto';

@Controller('pagination')
export class PaginationController {
  constructor(private readonly paginationService: PaginationService) {}

  @Post()
  create(@Body() createPaginationDto: CreatePaginationDto) {
    return this.paginationService.create(createPaginationDto);
  }

  @Get()
  findAll() {
    return this.paginationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paginationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaginationDto: UpdatePaginationDto) {
    return this.paginationService.update(+id, updatePaginationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paginationService.remove(+id);
  }
}
