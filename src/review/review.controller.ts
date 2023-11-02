import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ReviewDto } from './dto/review.dto'
import { ReviewService } from './review.service'

@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll() {
		return this.reviewService.getAll()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('leave/:productId')
	@Auth()
	async leaveReview(
		@CurrentUser('id') id: number,
		@Body() dto: ReviewDto,
		@Param('productId') productId: string
	) {
		return this.reviewService.create(id, dto, +productId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Get(':productId')
	@Auth()
	async getAverageValueByProductId(@Param('productId') productId: string) {
		return this.reviewService.getAverageValueByProductId(+productId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@CurrentUser('id') userId: number, @Param('id') id: string) {
		return this.reviewService.delete(userId, +id)
	}
}
