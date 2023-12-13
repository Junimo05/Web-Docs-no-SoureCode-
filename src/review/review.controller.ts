import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Prisma } from '@prisma/client';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  getAll() {
    return this.reviewService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.reviewService.getById(Number(id));
  }

  @Post()
  create(@Body() review: Prisma.ReviewCreateInput) {
    return this.reviewService.create(review);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() review: Prisma.ReviewUpdateInput) {
    return this.reviewService.update({
      where: { id_Review: Number(id) },
      data: review,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reviewService.delete({ where: { id_Review: Number(id) } });
  }
}
