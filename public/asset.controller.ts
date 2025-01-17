import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AssetService } from '../services/asset.service';
import { AnalysisResponseDto, ChartDto } from '../dtos';
import {
  ApiOperation,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard, AdminGuard } from '@backend/shared/modules';

@ApiBearerAuth()
@ApiTags('Asset Analytics')
@ApiBadRequestResponse({
  description: 'Bad Request',
})
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
@ApiForbiddenResponse({
  description: 'Forbidden',
})
@ApiTooManyRequestsResponse({
  description: 'Too Many Requests',
})
@UseGuards(AuthGuard, AdminGuard)
@Controller('analytics/assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @ApiOperation({
    summary: 'Get Total',
    description: 'Get asset total statistics',
  })
  @ApiOkResponse({
    description: 'OK',
    type: AnalysisResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Get('total')
  async getTotal() {
    return this.assetService.getTotalCount();
  }

  @ApiOperation({
    summary: 'Get Yearly Monthly Assets Counts',
    description:
      'Get Assets counts grouped by month for the previous year and current month (up to today)',
  })
  @ApiOkResponse({
    description: 'Ok',
    type: ChartDto,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/yearly-monthly')
  async getYearlyMonthlyAssetsCounts() {
    return this.assetService.getYearlyMonthlyAssetsCounts();
  }
}
