import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common'
import { StatisticsService } from './statistics.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Get('main')
	@Auth()
	async getMainStatistics(@CurrentUser('id') id: number) {
		return this.statisticsService.getMain(id)
	}
}
